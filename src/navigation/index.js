import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, ActivityIndicator} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import CallScreen from '../screens/VideoCallScreens/CallScreen';
import ContactsScreen from '../screens/VideoCallScreens/ContactsScreen';
import CallingScreen from '../screens/VideoCallScreens/CallingScreen';
import IncomingCallScreen from '../screens/VideoCallScreens/IncomingCallScreen';
import LoginScreen from '../screens/VideoCallScreens/LoginScreen';

import SocialNetworkScreen from '../screens/SocialNetworkScreens';
import CommentListScreen from '../screens/SocialNetworkScreens/CommentListScreen';
import VideoCallHomeScreen from '../screens/VideoCallScreens/VideoCallHomeScreen';
import SetMeetingScreen from '../screens/VideoCallScreens/SetMeetingScreen';

import SignInScreen from '../screens/AuthenticationScreens/SignInScreen';
import SignUpScreen from '../screens/AuthenticationScreens/SignUpScreen';
import ForgotPasswordScreen from '../screens/AuthenticationScreens/ForgotPasswordScreen';
import ConfirmEmailScreen from '../screens/AuthenticationScreens/ConfirmEmailScreen';
import NewPasswordScreen from '../screens/AuthenticationScreens/NewPasswordScreen';
import HomeScreen from '../screens/HomeScreens/HomeScreen';
import ExitScreen from '../screens/AuthenticationScreens/ExitScreen';

import LogWeightScreen from '../screens/HomeScreens/LogWeightScreen';
import StepTrackingScreen from '../screens/HomeScreens/StepTrackingScreen';
import LogMealScreen from '../screens/HomeScreens/LogMealScreen';

import FillInDataScreen from '../screens/FillInDataScreen';
import Router from '../router';
import {Auth, Hub} from 'aws-amplify';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
//group - apply options to multiple screens - using group

function DrawerOptions() {
  return (
    <Drawer.Navigator initialRouteName="Home" options={{unmountOnBlur: true}}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: () => <Icon name="home" size={30} color="#900" />,
        }}
      />
      <Drawer.Screen
        name="Social Network"
        component={Router}
        options={{
          drawerIcon: () => <Icon name="home" size={30} color="#900" />,
        }}
      />
      <Drawer.Screen
        name="Video Call"
        component={VideoCallHomeScreen}
        options={{
          drawerIcon: () => <Icon name="phone" size={25} color="#900" />,
        }}
      />
      <Drawer.Screen
        name="Fill In Data"
        component={FillInDataScreen}
        options={{
          drawerIcon: () => <Icon name="phone" size={25} color="#900" />,
        }}
      />
      <Drawer.Screen
        name="Sport"
        component={HomeScreen}
        options={{
          drawerIcon: () => <Icon name="tv" size={25} color="#900" />,
        }}
      />
      <Drawer.Screen
        name="Menu"
        component={HomeScreen}
        options={{
          drawerIcon: () => <Icon name="book" size={25} color="#900" />,
        }}
      />
      <Drawer.Screen
        name="About"
        component={HomeScreen}
        options={{
          drawerIcon: () => <Icon name="about" size={25} color="#900" />,
        }}
      />
      <Drawer.Screen
        name="Exit"
        initialParams={{signOut: true}}
        // options={{headerShown: false}}
        component={SignInScreen}
        options={
          ({
            drawerIcon: () => (
              <Icon name="times-circle" size={30} color="#900" />
            ),
          },
          {headerShown: false})
        }
      />
    </Drawer.Navigator>
  );
}

const Navigation = () => {
  const [user, setUser] = useState(undefined);

  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      setUser(authUser);
    } catch (e) {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const listener = data => {
      if (data.payload.event === 'signIn' || data.payload.event === 'signOut') {
        checkUser();
      }
    };

    Hub.listen('auth', listener);
    return () => Hub.remove('auth', listener);
  }, []);

  if (user === undefined) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
        <Stack.Group screenOptions={{headerShown: false}}>
          {user ? (
            <Stack.Screen
              name="HomeScreen"
              component={DrawerOptions}
              options={{headerShown: false}}
            />
          ) : (
            //////////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            <>
              <Stack.Screen name="SignInScreen" component={SignInScreen} />
              <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
              <Stack.Screen
                name="ForgotPasswordScreen"
                component={ForgotPasswordScreen}
              />
              <Stack.Screen
                name="ConfirmEmailScreen"
                component={ConfirmEmailScreen}
              />
              <Stack.Screen
                name="NewPasswordScreen"
                component={NewPasswordScreen}
              />
            </>
          )}
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
          />
          <Stack.Screen
            name="ConfirmEmailScreen"
            component={ConfirmEmailScreen}
          />
          <Stack.Screen
            name="NewPasswordScreen"
            component={NewPasswordScreen}
          />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen name="Log Weight" component={LogWeightScreen} />
          <Stack.Screen name="Step Tracking" component={StepTrackingScreen} />
          <Stack.Screen name="Log Meal" component={LogMealScreen} />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen name="SocialNetwork" component={SocialNetworkScreen} />
          <Stack.Screen
            name="CommentListScreen"
            component={CommentListScreen}
          />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Contacts" component={ContactsScreen} />
          <Stack.Screen name="SetMeeting" component={SetMeetingScreen} />
          <Stack.Screen
            name="Call"
            component={CallScreen}
            screenOptions={{headerShown: false}}
          />
          <Stack.Screen
            name="Calling"
            component={CallingScreen}
            screenOptions={{headerShown: false}}
          />
          <Stack.Screen
            name="IncomingCall"
            component={IncomingCallScreen}
            screenOptions={{headerShown: false}}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
