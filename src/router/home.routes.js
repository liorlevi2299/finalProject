import React from 'react';
import {Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import logo from '../../assets/images/logo.webp';
// import logo from '../assets/images/logo.webp';
import HomeScreen from '../screens/SocialNetworkScreens/HomeScreen';
import StoryScreen from '../screens/SocialNetworkScreens/StoryScreen';
const HomeStack = createStackNavigator();

const HomeRoutes = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'MicMark',
          headerStyle: {
            backgroundColor: '#ebaba7',
          },
          headerTitleAlign: 'center',

          headerLeftContainerStyle: {
            marginLeft: 7,
          },
          headerRightContainerStyle: {
            marginRight: 7,
          },
          headerLeft: () => {
            return <Feather name={'camera'} size={25} style={{padding: 5}} />;
          },
          headerTitle: () => {
            return (
              <Image
                source={logo}
                resizeMode="contain"
                style={{width: 150, height: 50}}
              />
            );
          },
          headerRight: () => {
            return (
              <Ionicons
                name="paper-plane-outline"
                size={25}
                style={{padding: 5}}
              />
            );
          },
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeRoutes;
