import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import { firebaseConfig } from './config/settings'
import Router from './Router';
import reducers from './reducers';
import { persistStore, persistReducer } from 'redux-persist';


const persistConfig = {
    key: 'root',
    storage : AsyncStorage,
    blacklist: ['auth']
  }

const persistedReducer = persistReducer(persistConfig, reducers);

let store = createStore(persistedReducer, {}, applyMiddleware(ReduxThunk));
let persistor = persistStore(store);

export default class App extends Component {

    render() {
        return (
                <Provider store={store}>
                    <Router />
                </Provider>
            
        );
    }
}