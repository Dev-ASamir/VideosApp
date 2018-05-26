import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import { firebaseConfig } from './config/settings'
//import { Header } from './components/common';
import Router from './Router';
import reducers from './reducers';
import { persistStore, persistReducer } from 'redux-persist';


const persistConfig = {
    key: 'root',
    storage : AsyncStorage,
    
  }

const persistedReducer = persistReducer(persistConfig, reducers);

let store = createStore(persistedReducer, {}, applyMiddleware(ReduxThunk));
let persistor = persistStore(store);  

export default class App extends Component {

 /*   componentWillMount() {
        // Initialize Firebase
        const config = {
            apiKey: "AIzaSyDmlup4ulWXEH-fSJI2Wxq58WZIB59pNN4",
            authDomain: "videos-app-a1592.firebaseapp.com",
            databaseURL: "https://videos-app-a1592.firebaseio.com",
            projectId: "videos-app-a1592",
            storageBucket: "videos-app-a1592.appspot.com",
            messagingSenderId: "29338328999"
          };
          firebase.initializeApp(config);
    }*/

    render() {
        return (
                <Provider store={store}>
                    <Router />
                </Provider>
            
        );
    }
}