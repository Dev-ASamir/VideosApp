import React, { Component } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import SideMenu from 'react-native-side-menu';
import Menu from './Menu';
import { videosFetch } from '../actions';
import { Card, CardSection, Button, Spinner } from '../components/common';
import { Actions } from 'react-native-router-flux';
import ListItem from './ListItem';

const image = require('../images/menu.png');

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      loading: false,
      isOpen: false,
      selectedItem: 'About',
    }
    this.renderItem = this.renderItem.bind(this);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  onMenuItemSelected = item =>
    this.setState({
      isOpen: false,
      selectedItem: item,
    });

  async componentDidMount() {
    await this.props.videosFetch();
    this.setState({ loading: true });
  }

  renderItem({ item }) {
    return <ListItem item={item} />
  }

  render() {

    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;
    const { videos } = this.props;

    if (videos && videos.length === 0) {
      return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
        <Spinner size='large' />
      </View>
    } else {
      return (
        <SideMenu
          menu={menu}
          isOpen={this.state.isOpen}
          onChange={isOpen => this.updateMenuState(isOpen)}
        >
          <View style={styles.titleStyle} >
            <Text style={styles.TextStyle}>Videos App</Text>
          </View>
          <TouchableOpacity
            onPress={this.toggle}
            style={styles.button}
          >
            <Image
              source={image}
              style={{ width: 32, height: 32 }}
            />

          </TouchableOpacity>
          <View style={styles.container}>
            <FlatList
              data={videos}
              keyExtractor={i => i.videoId}
              renderItem={this.renderItem}
              extraData={this.state}
            />
          </View>
        </SideMenu>
      )
    }

  }
}


const mapStateToProps = state => {
  return { videos: state.videos.videos };
};

export default connect(mapStateToProps, { videosFetch })(HomePage);

const styles = {
  button: {
    position: 'absolute',
    top: 20,
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 5,
  },
  titleStyle: {
    flexDirection: 'row',
    flex: 0.15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F8F8F8',
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    position: 'relative',
  },
  TextStyle: {
    paddingTop: 35,
    paddingBottom: 25,
    fontSize: 18,
    alignSelf: 'center',
    color: 'black'
  },
}