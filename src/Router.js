import React, { Component } from 'react';
import { Scene, Router, Stack, Actions } from 'react-native-router-flux';
import { Text, View, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { Spinner } from './components/common';
import LoginForm from './screens/LoginForm';
import Registration from './screens/Registration';
import ResetPassword from './screens/ResetPassword';
import HomePage from './screens/HomePage';
import ShowVideos from './screens/ShowVideos';
import Favorite from './screens/Favorite';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class RouterComponent extends Component {

    constructor() {
        super();
        this.state = {
            loading: true,
            authenticated: false,
        };
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loading: false, authenticated: true });
            } else {
                this.setState({ loading: false, authenticated: false });
            }
        });
    }


    render() {

        if (this.state.loading) return <Spinner size="large" />;

        if (!this.state.authenticated) {
            return (<Router>
                <Scene key="auth">
                    <Scene
                        key="login"
                        title="Videos App"
                        component={LoginForm}
                        titleStyle={{ alignSelf: 'center' }}
                    />
                    <Scene
                        // rightTitle="logout"
                        //   onRight={() => { Actions.login({ type: 'reset' });}}
                        key="registr"
                        component={Registration}
                        title="Videos App"
                        titleStyle={{ alignSelf: 'center', marginRight: 90 }}
                    />
                    <Scene
                        key="resetPassword"
                        component={ResetPassword}
                        title="Videos App"
                        titleStyle={{ alignSelf: 'center', marginRight: 65 }}
                    />

                    <Scene
                        /* renderBackButton={() => 
                           <TouchableOpacity onPress={() => {
                               firebase.auth().signOut()
                               Actions.login({ type: 'reset' });}}>
                              <Text style={styles.textStyle}> logout </Text>
                           </TouchableOpacity>}*/
                        rightTitle="logout"
                        onRight={() => {
                            firebase.auth().signOut()
                            Actions.login({ type: 'reset' });
                        }}
                        hideNavBar
                        key="homePage"
                        component={HomePage}
                        title="Videos App"
                        titleStyle={{ alignSelf: 'center', marginLeft: 60 }}
                        rightButtonTextStyle={{ color: 'black', fontWeight: 'bold' }}
                        leftTitle = { <Icon name={"heart"} size={25} color="red" /> } 
                    />
                    <Scene
                        //  hideNavBar
                        key="showVideoes"
                        component={ShowVideos}
                        title="Videos App"
                        titleStyle={{ alignSelf: 'center', marginRight: 65 }}
                    />
                    <Scene
                        //  hideNavBar
                        back
                        key="favoriteList"
                        component={Favorite}
                        title="My WishList"
                        titleStyle={{ alignSelf: 'center', marginRight: 65 }}
                    />

                </Scene>
            </Router>

            );
        }

        return (<Router>
            <Scene key="auth">
                <Scene
                    key="login"
                    component={LoginForm}
                    title="Videos App"
                    titleStyle={{ alignSelf: 'center' }}
                />
                <Scene
                    // rightTitle="logout"
                    //   onRight={() => { Actions.login({ type: 'reset' });}}
                    key="registr"
                    component={Registration}
                    title="Videos App"
                    titleStyle={{ alignSelf: 'center', marginRight: 90 }}
                />
                <Scene
                    //   hideNavBar
                    key="resetPassword"
                    component={ResetPassword}
                    title="Videos App"
                    titleStyle={{ alignSelf: 'center', marginRight: 65 }}

                />

                <Scene
                    initial
                    /*   renderBackButton={() => 
                       <View>
                           <Text onPress={() => {
                               firebase.auth().signOut()
                               Actions.login({ type: 'reset' });}}>
                               style={styles.textStyle}> logout >
                           </Text>
                           </View>
                           }*/
                    rightTitle="logout"
                    onRight={() => {
                        firebase.auth().signOut()
                        Actions.login({ type: 'reset' });
                    }}
                    hideNavBar
                    key="homePage"
                    component={HomePage}
                    title="Videos App"
                    titleStyle={{ alignSelf: 'center', marginLeft: 60 }}
                    rightButtonTextStyle={{ color: 'black', fontWeight: 'bold' }}
                    renderLeftButton = { 
                        <Icon 
                            onPress={ ()=> Actions.favoriteList() }
                            name={"heart"} 
                            size={25} color="red"
                             style={{marginLeft:20}} 
                             />
                        } 


                />
                <Scene
                    key="showVideoes"
                    component={ShowVideos}
                    title="Videos App"
                    back
                    titleStyle={{ alignSelf: 'center', marginRight: 65 }}
                />
                <Scene
                    //  hideNavBa
                    key="favoriteList"
                    component={Favorite}
                    title="My WishList"
                    titleStyle={{ alignSelf: 'center', marginRight: 65 }}
                />
            </Scene>
        </Router>

        );
    }

};
/*
                        <Scene
                        hideNavBar
                        key="showVideoes"
                        component={ShowVideos}
                       // title="Videos App"
                       // titleStyle={{alignSelf : 'center' , marginRight: 65}}
                    />

                                        <Scene
                        hideNavBar
                        key="showVideoes"
                        component={ShowVideos}
                     //   title="Videos App"
                      //  titleStyle={{alignSelf : 'center' , marginRight: 65}}
                    />*/
const styles = {

    textStyle: {
        alignSelf: 'flex-end',
        fontSize: 16,
        color: 'red',
        marginLeft: 280,
    }
}
