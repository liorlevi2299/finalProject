import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/core';
import ContactsScreen from '../ContactsScreen';
import Logo from '../../../components/Logo';

const VideoCallHomeScreen = () => {
  const navigation = useNavigation();
  const item = "linoy"; //try to move to other screen

  const ContactsPressHandler = () => {
    navigation.navigate("Contacts");
  };

  const CallPressHandler = () => {
    navigation.navigate("Login");
  };

  const SetMeetingPressHandler = () => {
    navigation.navigate("SetMeeting", item);
  };
  
  return (
    <View style={styles.page}>
      <Logo/>
      <TouchableOpacity onPress={CallPressHandler} style={styles.button}>
        <Text style={styles.buttonText}> Start a Call </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={ContactsPressHandler} style={styles.button}>
        <Text style={styles.buttonText}> Contacts List </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={SetMeetingPressHandler} style={styles.button}>
        <Text style={styles.buttonText}> Set meeting time </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
    flexDirection: "row",
  },
  buttonText:{
    color: "black",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
    marginRight: 10,
  },
  
});

export default VideoCallHomeScreen;
