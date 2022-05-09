import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/core';

const ExitScreen = () => {
  const navigation = useNavigation();

  const onExitPressed = () => {
    navigation.navigate('SignInScreen', true);
  };

  return (
    <Pressable onPress={onExitPressed}/>
  );
};

export default ExitScreen;
