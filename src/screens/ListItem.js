import React, { Component } from 'react';
import {
    Text,
    TouchableWithoutFeedback,
    View,
    NativeModules,
    LayoutAnimation,
    TouchableOpacity,
    Image,
    ImageBackground,
    AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button, Spinner, Header } from '../components/common';
import { videoSave, addToWishList } from '../actions';
//import * as actions from '../actions';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);

class ListItem extends Component {

    constructor(props){
        super(props);
        this.onLikePress = this.onLikePress.bind(this);
    }
    componentWillUpdate() {
        LayoutAnimation.spring();
    }

    componentWillMount() {
    AsyncStorage.getItem('somekey')
    .then(req => JSON.parse(req))
    .then(json => console.log(json))
    .catch(error => alert('error!'));
    }

    renderDescription() {
        const { item, expanded } = this.props;
        if (expanded) {
            Actions.showVideoes({ param1: item, });
        }
    }


    onLikePress({video}){
        const {wishlist} = this.props;
        this.props.addToWishList({video, wishlist});
    }


    onButtonPress() {
        const { videoId, title } = this.props.item;
        const { wishList } = this.props;
       if(wishList.indexOf(videoId)==-1)
       {
         wishList.push(videoId)
        alert(wishList.length)
        this.props.videoSave({ videoId, title  , wishList , uid: this.props.item.uid }) 
    AsyncStorage.setItem('somekey', JSON.stringify(wishList))
      .then(json => alert('success!'))
      .catch(error => alert('error2')); }
      else {
          alert("alerdy saved")
      }
    }

    render() {
        const { titleStyle } = styles;
        const { videoId, title, image } = this.props.item;
        const { item, expanded, wishlist } = this.props;

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