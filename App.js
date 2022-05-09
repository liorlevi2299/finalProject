/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Amplify from 'aws-amplify';
import config from './src/aws-exports';
import Navigation from './src/navigation';

Amplify.configure(config);

const App = () => {
  return (
    <>
      <StatusBar barStyle={'dark-content'} />

      <Navigation />
    </>
  );
};

export default App;
