import React, { Component } from 'react';
import { Scene, Router, Stack, Actions } from 'react-native-router-flux';
import { Text, View } from 'react-native';
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
                        hideNavBar
                        key="homePage"
                        component={HomePage}
                    />
                    <Scene
                        key="showVideoes"
                        component={ShowVideos}
                        title="Videos App"
                        back
                        titleStyle={{ alignSelf: 'center', marginRight: 65 }}
                    />
                    <Scene
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
                    title="Videos App"
                    component={LoginForm}
                    titleStyle={{ alignSelf: 'center' }}
                />
                <Scene
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
                    initial
                    hideNavBar
                    key="homePage"
                    component={HomePage}
                    renderLeftButton={
                        <Icon
                            onPress={() => Actions.favoriteList()}
                            name={"heart"}
                            size={25} color="red"
                            style={{ marginLeft: 20 }}
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

