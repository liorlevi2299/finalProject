import React, {useState} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useRoute, useNavigation} from '@react-navigation/native';

const HomeActionBox= ({}) => {

  const navigation = useNavigation();

  const weightPressHandler = () => {
    navigation.navigate("Log Weight");
  }
  const profilePressHandler = () => {
    navigation.navigate("HomeScreen");
  }
  const sportPressHandler = () => {
    navigation.navigate("Step Tracking");
  }
  const mealPressHandler = () => {
    navigation.navigate("Log Meal");
  }
  return (
    <View style={styles.buttonsContainer}>

      <Pressable onPress={profilePressHandler} style={styles.iconButton}>
        <Ionicons name="person-outline" size={30} color={'white'} />
      </Pressable>

      <Pressable onPress={mealPressHandler} style={styles.iconButton}>
        <MaterialIcons name="set-meal" size={30} color={'white'} />
      </Pressable>

      <Pressable onPress={weightPressHandler} style={styles.iconButton}>
        <MaterialCommunityIcons name="weight-kilogram" size={30} color={'white'} />
      </Pressable>
    
      <Pressable onPress={sportPressHandler} style={styles.iconButton}>
        <MaterialCommunityIcons name="weight-lifter" size={30} color={'white'} />
      </Pressable>
      
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    backgroundColor: '#aba7a7',
    padding:15,
    paddingBottom: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    
  },
  iconButton: {
    backgroundColor: '#f75e5f',
    padding: 20,
    borderRadius: 50,
    
  },
});

export default HomeActionBox;
