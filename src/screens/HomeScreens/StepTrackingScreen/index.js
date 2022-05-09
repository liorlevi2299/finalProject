// // import * as React from 'react';
// import React, {useEffect, useState} from 'react';
// import { Button,Text, View, TouchableOpacity, StyleSheet, Pressable, TextInput } from 'react-native';
// import {useRoute, useNavigation} from '@react-navigation/native';
// import HomeActionBox from '../../../components/HomeActionBox';
// import Logo from '../../../components/Logo';
// import * as Progress from 'react-native-progress';

// const StepTrackingScreen = () => {
//     const navigation = useNavigation();

//     const [steps, setSteps] = useState(2345);
//     const [date, setDate] = useState(null);

//     useEffect(() => {
//         let today = new Date();
//         let date = today.getDate() + '/'+ (today.getMonth()+1)+ '/' + today.getFullYear();
//         setDate(date);
//     }, []);

//     return (
//         <View style={{flex:1,}}>
//             <Logo/>
//             <Text style={styles.date}> {date} </Text>
//             <View style={{flex:1, alignItems: 'center',justifyContent: 'center',  }}>
//                 <Text style={styles.date}> {steps} steps </Text>
//                 <Progress.Bar style={{alignSelf: 'center',}} progress={0.7} width={300} color="#f75e5f"/>

//             </View>

//             <HomeActionBox/>
//         </View>
//     );

// }

// const styles = StyleSheet.create({

//     date:{
//         fontSize: 20,
//         color: 'black',
//         alignSelf: 'center',
//     },

// });
// export default StepTrackingScreen;

// import * as React from 'react';
import React, {useEffect, useState} from 'react';
import {
  Button,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  TextInput,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import HomeActionBox from '../../../components/HomeActionBox';
import Logo from '../../../components/Logo';
import StepCounter from '../../../components/StepCounter';

const StepTrackingScreen = () => {
  const navigation = useNavigation();

  const [date, setDate] = useState(null);

  useEffect(() => {
    let today = new Date();
    let date =
      today.getDate() +
      '/' +
      (today.getMonth() + 1) +
      '/' +
      today.getFullYear();
    setDate(date);
  }, []);

  return (
    <View style={{flex: 1}}>
      <Logo />
      <Text style={styles.date}> {date} </Text>
      <StepCounter />
      <HomeActionBox />
    </View>
  );
};

const styles = StyleSheet.create({
  date: {
    fontSize: 20,
    color: 'black',
    alignSelf: 'center',
  },
});
export default StepTrackingScreen;
