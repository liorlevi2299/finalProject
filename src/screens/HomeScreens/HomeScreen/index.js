import React, {useEffect, useState, useRef} from 'react';
import {View,ScrollView, TouchableOpacity,Image, Text, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/core';
import {Auth} from 'aws-amplify';
import Feed from '../../../components/Feed';
import HomeActionBox from '../../../components/HomeActionBox';
import Logo from '../../../components/Logo';
// import { Button } from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(null);

  const [checkBoxLogWeight, setCheckBoxLogWeight] = useState(false)
  const [checkBoxLogMeal, setCheckBoxLogMeal] = useState(false)
  const [checkBoxGoPre, setCheckBoxGoPre] = useState(false)
  const [checkBoxTrackExe, setCheckBoxTrackExe] = useState(false)
  const [checkBoxFinishTut, setCheckBoxFinishTut] = useState(false)

  const homeActionBoxValue = [
    {
      'heading' : 'Steps',
      'value': '2345' //change to real values
    },
    {
      'heading' : 'Meals',
      'value': '2/5'
    },
    {
      'heading' : 'Weight',
      'value': '3 in a row'
    }
  ]
  const checkboxElements = [
    { 
      'value': checkBoxLogWeight,
      'set': setCheckBoxLogWeight,
      'text': 'Log your weight'
    },
    { 
      'value': checkBoxLogMeal,
      'set': setCheckBoxLogMeal,
      'text': 'Log meal'
    },
    { 
      'value': checkBoxGoPre,
      'set': setCheckBoxGoPre,
      'text': 'Go premium'
    },
    { 
      'value': checkBoxTrackExe,
      'set': setCheckBoxTrackExe,
      'text': 'Track your exercise'
    },
    { 
      'value': checkBoxFinishTut,
      'set': setCheckBoxFinishTut,
      'text': 'Finish dietary tutorial'
    }    
  ];

  const Screen2PressHandler = () => {
    navigation.navigate('Screen2');
  };

  useEffect(() => {
    let today = new Date();
    let date = today.getDate() + '/'+ (today.getMonth()+1)+ '/' + today.getFullYear();

    setDate(date);
  }, []);

  return (
    <View style={styles.page}>
      <Logo/>
      <Text style={styles.date}> {date}  X weeks</Text>

      <View style={styles.topBox}>
        {
          homeActionBoxValue.map((elemnt, index) => (
            <View style={styles.elementInTopBox} key={index}>
              <Text style={styles.headingText}> {elemnt.heading} </Text>
              <TouchableOpacity style={styles.roundButtonTopBox}>
                <Text style={styles.textRoundButtonTopBox}> {elemnt.value} </Text>
              </TouchableOpacity>   
            </View>
          ))
        }
      </View>
         
      <ScrollView style={{alignContent:'center'}}>
        <TouchableOpacity onPress={Screen2PressHandler} style={styles.mainButton}>
          <Text style={styles.textMainButton}> Your test results </Text>
        </TouchableOpacity>   
        <TouchableOpacity onPress={Screen2PressHandler} style={styles.mainButton}>
          <Text style={styles.textMainButton}> Dietary recommandations </Text>
        </TouchableOpacity> 
        {
          checkboxElements.map((elemnt, index) => (
            <View style={styles.mainButton} key={index}>
              <CheckBox
                disabled={false}
                value={elemnt.value}
                onValueChange={(newValue) => elemnt.set(newValue)}
              />
              <Text style={styles.textMainButton}> {elemnt.text} </Text>
            </View> 

          ))
        }
      </ScrollView>
      

      {/* <Text
        onPress={signOut}
        style={{
          width: '100%',
          textAlign: 'center',
          color: 'red',
          marginTop: 'auto',
          marginVertical: 20,
          fontSize: 20,
        }}>
        Sign out
      </Text> */}
      <HomeActionBox/>
    </View>
  );
};
const signOut = () => {
  Auth.signOut();
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  date:{
    fontSize: 20, 
    color: 'black', 
    alignSelf: 'center',
  },
  topBox:{
    flexDirection: 'row',
    justifyContent: 'space-evenly', 
    borderColor:'#aba7a7',
    borderWidth: 2, 
    height: 110,
    alignItems:'center',

  },
  elementInTopBox: {
    flexDirection: 'column', 
    alignItems:'center',
  },
  headingText: {
    color: 'black', 
    fontWeight: 'bold', 
    fontSize:15,
    padding: 10,
  },
  roundButtonTopBox: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#aba7a7',
    
  },
  textRoundButtonTopBox: {
    color: 'black', 
    fontWeight: 'bold', 
    textAlign: 'center',
    
  },
  mainButton:{
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 50,
    elevation: 3,
    flexDirection:'row',
    
    
  },
  textMainButton: {
    color: 'black', 
    textAlign: 'center',
    fontSize: 22,
  },
});

export default HomeScreen;
