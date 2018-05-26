import React, { Component } from 'react';
import {
    Text,
    TouchableWithoutFeedback,
    View,
    NativeModules,
    LayoutAnimation,
    TouchableHighlight,
    Image,
    WebView
} from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button, Spinner, Header } from '../components/common';
//import { selectVideo } from '../actions';
import * as actions from '../actions';
import { Actions } from 'react-native-router-flux';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);

class ShowVideos extends Component {

    constructor(props) {
        super(props)
        this.state = {
            flag: true,
        }
    }

    componentWillUpdate() {
        LayoutAnimation.spring();
    }

    renderDescription() {
        const { title } = this.props.param1;
        if (!this.state.flag) {
            return (

                <CardSection>
                    <View style={{ flex: 0.75, alignItems: 'center', justifyContent: 'center' }} >
                        <Text style={{
                            alignItems: 'center',
                            alignSelf: 'center',
                            color: 'black',
                            fontSize: 18,
                            justifyContent: 'center'
                        }}>
                            {title}
                        </Text>
                    </View>
                </CardSection>

            );
        }
    }
    // <TouchableWithoutFeedback onPress={() => { this.setState({ flag: false }); }}>
    //{this.renderDescription()}
    // </TouchableWithoutFeedback>
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
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15,
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
};

const mapStateToProps = (state) => {
    return { state, videos: state.videos.videos };
}

export default connect(mapStateToProps)(ShowVideos);