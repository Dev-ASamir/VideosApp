import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ListItem from './ListItem';

class Favorite extends Component {


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

