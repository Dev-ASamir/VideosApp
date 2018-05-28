import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    WebView
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Actions } from 'react-native-router-flux';


class ShowVideos extends Component {

    render() {

        const { title, image, videoId } = this.props.param1;

            return ( 
                    <WebView style={styles.container}
                        style={styles.webView}
                        javaScriptEnabled={true}
                        source={{ uri: 'https://www.youtube.com/embed/' + this.props.param1.videoId + '?rel=0&autoplay=1&showinfo=1&controls=1' }}
                    />
                  
            );

    };
};

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        marginTop: '25%',
        marginBottom: '25%',
    },
};

const mapStateToProps = (state) => {
    return { state, videos: state.videos.videos };
}

export default connect(mapStateToProps)(ShowVideos);