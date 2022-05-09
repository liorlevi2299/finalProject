import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/core';

const SetMeetingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute(); //acsess to agruments

  //try to acsees variable from another screen
  return (
    <View style={styles.page}>
      
      <Text style={{color:'red'}}> { route?.params } </Text> 
      
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },  
});

export default SetMeetingScreen;
