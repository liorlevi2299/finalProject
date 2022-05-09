// import * as React from 'react';
import React, {useEffect, useState} from 'react';
import { Button,Text, View, TouchableOpacity, StyleSheet, Pressable, TextInput } from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import HomeActionBox from '../../../components/HomeActionBox';
import Logo from '../../../components/Logo';
import Modal from "react-native-modal";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const LogMealScreen = () => {
  const navigation = useNavigation();
  const [isMealModalVisible, setMealModalVisible] = useState(false);
  const [isMealInfoModalVisible, setMealInfoModalVisible] = useState(false);
  const [showEnteredMeal, setEnteredMeal] = useState(false);

  const [isBreakfastPress, setBreakfastPress] = useState(false);
  const [breakfastMeal, setBreakfastMeal] = useState(null);

  const [isLunchPress, setLunchPress] = useState(false);
  const [lunchMeal, setLunchMeal] = useState(null);

  const [isDinnerPress, setDinnerPress] = useState(false);
  const [dinnerMeal, setDinnerMeal] = useState(null);
  
  const [isSnackPress, setSnackPress] = useState(false);
  const [snackMeal, setSnackMeal] = useState(null);

  const toggleMealModal = () => {
    setMealModalVisible(!isMealModalVisible);
  };

  const mealInfo = () => {
    setMealInfoModalVisible(!isMealInfoModalVisible);
  };

  const savePressHandler = () => {
    if(isBreakfastPress) {
      setBreakfastPress(!isBreakfastPress)
    } else if (isLunchPress) {
      setLunchPress(!isLunchPress)
    } else if (isDinnerPress) {
      setDinnerPress(!isDinnerPress)
    } else if (isSnackPress) {
      setSnackPress(!isSnackPress)
    }
    setMealInfoModalVisible(!isMealInfoModalVisible);
    setEnteredMeal(true)
  };

  const breakfastPressHandler = () => {
    setBreakfastPress(!isBreakfastPress)
    setMealInfoModalVisible(!isMealInfoModalVisible);
  }
  const lunchPressHandler = () => {
    setLunchPress(!isLunchPress)
    setMealInfoModalVisible(!isMealInfoModalVisible);
  }
  const dinnerPressHandler = () => {
    setDinnerPress(!isDinnerPress)
    setMealInfoModalVisible(!isMealInfoModalVisible);
  }
  const snackPressHandler = () => {
    setSnackPress(!isSnackPress)
    setMealInfoModalVisible(!isMealInfoModalVisible);
  }

  return (
    <View style={{flex:1,}}>
      <Logo/>
      <View style={styles.button}>
        <Text style={styles.text}> My Macros </Text>
        <Text style={styles.text}> Calories: {} Kcal </Text>
        <Text style={styles.text}> Carbs: {} g </Text>
        <Text style={styles.text}> Proetin: {} g </Text>
        <Text style={styles.text}> Fat: {} g </Text>
        <Text style={styles.text}> Fibers: {} g </Text>
      </View>
      <TouchableOpacity onPress={toggleMealModal} style={styles.button}>
        <Text style={{color: "black", fontSize: 16, textAlign: "center", marginRight: 10, fontWeight: "bold",}}>
          Log Meal 
        </Text>
      </TouchableOpacity>

      <Modal style={{backgroundColor:'white'}} isVisible={isMealModalVisible} backdropColor='white'>
        <Pressable onPress={toggleMealModal} >
          <MaterialIcons name="arrow-back" size={30} color={'black'} />
        </Pressable>
        <View style={{ flex: 1, alignItems: 'center',  }}>
          <Text style={{fontWeight:'bold',color: "black", fontSize: 22, }}>Choose meal:</Text>
          <Button title="Breakfast" onPress={breakfastPressHandler} />
          <Button title="Lunch" onPress={lunchPressHandler} />
          <Button title="Dinner" onPress={dinnerPressHandler} />
          <Button title="Snack" onPress={snackPressHandler} />
        </View>
      </Modal>

      <Modal style={{backgroundColor:'white'}} isVisible={isMealInfoModalVisible} backdropColor='white'>
        <Pressable onPress={mealInfo} >
          <MaterialIcons name="arrow-back" size={30} color={'black'} />
        </Pressable>
        <View style={{ flex: 1, alignItems: 'center', padding:20,}}>
          <Text style={{fontWeight:'bold',color: "black", fontSize: 22, }}> Enter your meal details:</Text>
          <View style={styles.button}>
            <TextInput
              onChangeText={(val)=> {
                if(isBreakfastPress) {
                  setBreakfastMeal(val)
                }
                else if (isDinnerPress) {
                  setDinnerMeal(val)
                }
                else if (isLunchPress) {
                  setLunchMeal(val)
                }
                else if (isSnackPress) {
                  setSnackMeal(val)
                }
              }}
              placeholder="food, size, cal"
              style={{fontSize: 18}}
              autoCapitalize="none"
            />
            <Pressable onPress={savePressHandler} style={{
                backgroundColor: '#f75e5f',
                padding: 10, 
                marginVertical: 10,
                borderRadius: 5,
                alignItems: 'center',}} 
            >
              <Text style={{
                color: 'black', 
                fontWeight: 'bold',
                fontSize:17,}}>
                  Save</Text>
            </Pressable>
          </View>

        </View>
      </Modal>


      {
        showEnteredMeal ? ( 
          <View>
            <Text style={{ color: "black", fontSize: 16, textAlign: "center", marginRight: 10, fontWeight:"bold"}}>
               My meals: </Text>
            <Text style={styles.text}> Breakfast: {breakfastMeal} </Text>
            <Text style={styles.text}> Lunch: {lunchMeal} </Text>
            <Text style={styles.text}> Dinner: {dinnerMeal} </Text>
            <Text style={styles.text}> Snack: {snackMeal} </Text>
          </View>
        ) : null
      }

      <HomeActionBox/>
    </View>
  );
  
}

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
      flexDirection: "column",
    },
    text:{
      color: "black",
      fontSize: 16,
      textAlign: "center",
      marginRight: 10,
    },
    
    
});
export default LogMealScreen