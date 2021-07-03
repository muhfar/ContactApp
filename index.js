/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import Router from './src/router';
import { Provider } from 'react-redux';
import Store from './src/redux/store/store';

const App = () => {
    return (
        <Provider store={Store}>
            <Router />
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => App);
