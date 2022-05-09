import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {db} from '../SignUpScreen/index.js';
import {Auth} from 'aws-amplify';

const NewPasswordScreen = username => {
  const {control, handleSubmit, watch} = useForm();
  const navigation = useNavigation();
  const newPwd = watch('newPassword');
  const onSubmitPressed = async data => {
    try {
      await Auth.forgotPasswordSubmit(
        data.username,
        data.code,
        data.newPassword,
      );
      updateData();
      navigation.navigate('SignInScreen');
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
  };
  // const onSubmitPressed = data => {
  //   console.warn(data);
  //   updateData();
  //   navigation.navigate('HomeScreen');
  // };

  const onSignInPress = () => {
    navigation.navigate('SignInScreen');
  };

  const updateData = async () => {
    try {
      db.transaction(
        tx => {
          tx.executeSql(
            'UPDATE Users SET Password=? WHERE Username=?',
            [newPwd, username],
            () => {
              Alert.alert('Success!', 'Your data has been updated.');
            },
            error => {
              console.log(error);
            },
          );
        },
        err => {
          // if not successfull -
          console.warn('an error occurred when updating data from table.');
        },
        () => {
          // if successfull -
          console.warn('successfully updated data from table.');
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Reset your password</Text>
        <CustomInput
          placeholder="Username"
          name="username"
          control={control}
          rules={{required: 'Username is required'}}
        />

        <CustomInput
          placeholder="Code"
          name="code"
          control={control}
          rules={{required: 'Code is required'}}
        />

        <CustomInput
          placeholder="Enter your new password"
          name="newPassword"
          control={control}
          secureTextEntry
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters long',
            },
          }}
        />

        <CustomButton text="Submit" onPress={handleSubmit(onSubmitPressed)} />

        <CustomButton
          text="Back to Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});

export default NewPasswordScreen;
