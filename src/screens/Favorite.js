import React, { Component } from 'react';
import { View, ImageBackground, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import { favoriteFetch } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from '../components/common';
import { Actions } from 'react-native-router-flux';
import ListItem from './ListItem';

class Favorite extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    async componentWillMount() {
        await this.props.favoriteFetch();
        this.setState({ loading: true });
    }





    renderItem = ({ item }) => {
        return <ListItem item={item} />
    
    }

    render() {
        return (
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}} >
             <FlatList
                 data={this.props.wishlist}
                 keyExtractor={(i, idx) => idx}
                 renderItem={this.renderItem}
             />
            </View>

        );
    };
}

const mapStateToProps = state => {
    const {wishlist} = state.wishlist;
    return { wishlist };
};

export default connect(mapStateToProps)(Favorite);

