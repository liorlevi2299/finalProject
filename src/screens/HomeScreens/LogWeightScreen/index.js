// import * as React from 'react';
import React, {useEffect, useState} from 'react';
import { Button, Text, KeyboardAvoidingView, View, TouchableOpacity, StyleSheet, Pressable, TextInput } from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import HomeActionBox from '../../../components/HomeActionBox';
import Logo from '../../../components/Logo';
import DatePicker from 'react-native-datepicker';

const LogWeightScreen = () => {
    const navigation = useNavigation();
    const [date, setDate] = useState(null);
    const [weight, setWeight] = useState(null);

    const submitPressHandler = () => {
        console.log(date)
        console.log(weight)

    }

    useEffect(() => {
        let today = new Date();
        setDate(date);
    }, []);

    return (
        <KeyboardAvoidingView behavior="height" style={{flex: 1,}}>
            <Logo/>
            <TouchableOpacity style={styles.button}>
                    <DatePicker
                        style={{width: 380,  height: 70, justifyContent: 'center'}}
                        date={date}
                        mode="date"
                        placeholder="select date"
                        format="DD-MM-YYYY"
                        minDate="01-01-2022"
                        maxDate="01-01-2024"    
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                        }}
                        onDateChange={(date) => {setDate(date) }}

                        
                    />
            </TouchableOpacity>
            <View style={styles.button}>
                    <TextInput
                        keyboardType='numeric'
                        value={weight}
                        onChangeText={(val)=>setWeight(val)}
                        placeholder="enter weight"
                        style={styles.input}
                        autoCapitalize="none"
                    />
            </View>


            <Pressable onPress={submitPressHandler} style={{
                    backgroundColor: '#f75e5f',
                    padding: 10, 
                    marginVertical: 10,
                    borderRadius: 5,
                    alignItems: 'center',}} >
                    <Text style={{
                        color: 'black', 
                        fontWeight: 'bold',
                        fontSize:17,}}>
                        Submit</Text>
            </Pressable>

            <HomeActionBox/>
        </KeyboardAvoidingView>
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
    input:{
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
        textAlign: "center",

    },
    
});
export default LogWeightScreen