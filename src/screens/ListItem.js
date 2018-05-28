import React, { Component } from 'react';
import {
    Text,
    TouchableWithoutFeedback,
    View,
    TouchableOpacity,
    Image,
    AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Spinner, } from '../components/common';
import { videoSave, addToWishList } from '../actions';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



class ListItem extends Component {

    constructor(props){
        super(props);
        this.onLikePress = this.onLikePress.bind(this);
    }

    onLikePress({video}){
        const {wishlist} = this.props;
        this.props.addToWishList({video, wishlist});
    }


    render() {
        const { titleStyle } = styles;
        const { videoId, title, image } = this.props.item;
        const { item, wishlist } = this.props;

        const index = wishlist.findIndex(video=> video.videoId == item.videoId);
        const heartColor = index == -1 ? "#333" : "red";

        return (
            <View style={{flex:1}} >
                <TouchableWithoutFeedback onPress={() => {
                    Actions.showVideoes({ param1: item });
                }}>
                    <View>
                        <CardSection>
                            <View style={styles.button}>
                                <Image source={{ uri: image }} style={{ width: 320, height: 180 }}></Image>
                                <Text style={styles.buttonText}>{title}</Text>
                            </View>
                        </CardSection>

                    </View>
                </TouchableWithoutFeedback>
                <CardSection  >
                    <View style={{flexDirection:'row', flex:1 ,justifyContent:'center', alignItems:'center'}} >
                    <Text style={styles.titleStyle}>Add To Favorite</Text>
                    <TouchableOpacity onPress={()=> this.onLikePress({video : item})} >
                        <Icon name={"heart"} color={heartColor}  size={25} />
                    </TouchableOpacity>
                    </View>

                </CardSection>
            </View>
        );

    }

}

const styles = {
    titleStyle: {
        fontSize: 18,
        textAlign:'center',
        marginHorizontal:15
    },
    button: {
        marginBottom: 30,
        width: 260,
        alignItems: 'center',
        backgroundColor: '#2196F3'
    },
    buttonText: {
        padding: 20,
        color: 'white'
    }
}


const mapStateToProps = (state) => {
    const {videoId, title } = state.videos.videos;
    const {wishlist} = state.wishlist;
    return { videoId, title , wishlist}
}

export default connect(mapStateToProps, { videoSave, addToWishList })(ListItem);