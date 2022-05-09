import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ButtomHomeNavigator from './bottomHomeNavigator.routes';
import StoryScreen from '../screens/SocialNetworkScreens/StoryScreen';

const RootStack = createStackNavigator();
const Router = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name={'Home'}
        component={ButtomHomeNavigator}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="Story"
        component={StoryScreen}
        options={{title: ''}} // to make the back button disapper: headerShown: false
      />
    </RootStack.Navigator>
  );
};

export default Router;
