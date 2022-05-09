import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import DiscoveryScreen from '../screens/SocialNetworkScreens/DiscoveryScreen';
import ProfileScreen from '../screens/SocialNetworkScreens/ProfileScreen';
import NotificationsScreen from '../screens/SocialNetworkScreens/NotificationsScreen';
import CreatePostScreen from '../screens/SocialNetworkScreens/CreatePostScreen';
import HomeStackScreen from './home.routes';

const Tab = createMaterialBottomTabNavigator();

const ButtomHomeNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarLabel: false, // not showing the name
        tabBarColor: '#f75e5f',
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          size = 23;
          color = 'white';
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Discovery') {
            iconName = 'search1';
          } else if (route.name === 'New Post') {
            iconName = 'pluscircleo';
          } else if (route.name === 'Notifications') {
            iconName = 'hearto';
          } else if (route.name === 'Profile') {
            return (
              <Ionicons
                name={'person-circle-outline'}
                size={size}
                color={color}
              />
            );
          }

          return <AntDesign name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Discovery" component={DiscoveryScreen} />
      <Tab.Screen name="New Post" component={CreatePostScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default ButtomHomeNavigator;
