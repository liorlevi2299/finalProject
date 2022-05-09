import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Alert,
} from 'react-native';
import MicMarkLogo from '../../../../assets/images/micmark.png';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import SocialSignInButtons from '../../../components/SocialSignInButtons';
import {db} from '../SignUpScreen/index.js';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {Auth} from 'aws-amplify';

const SignInScreen = (signOut = false) => {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const {height} = useWindowDimensions();
  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm();
  // const signOut = false; // do
  global.username = watch('username');
  useEffect(() => {
    // deleteTable();
    createTable();
    if (signOut == false) {
      getData();
    } else {
      console.log('pressed exit');
    }
  }, []);

  const createTable = () => {
    db.transaction(
      tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS ' +
            'Users' +
            '(ID INTEGER PRIMARY KEY AUTOINCREMENT, Username TEXT, Email TEXT, Password TEXT);',
        );
      },
      err => {
        // if not successfull -
        console.warn('an error occurred when creating the table.');
      },
      () => {
        // if successfull -
        console.warn('successfully created the table.');
      },
    );
  };
  const onSignInPressed = async data => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const response = await Auth.signIn(data.username, data.password);
      console.log(response);
      signOut = false;
      getData();
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
    setLoading(false);
  };


  const onForgotPasswordPressed = () => {
    console.warn('forgot password');
    navigation.navigate('ForgotPasswordScreen');
  };

  const onSignUpPressed = () => {
    // redirect to the sign up screen
    console.warn('sign up');
    navigation.navigate('SignUpScreen');
  };

  const getData = () => {
    try {
      db.transaction(
        tx => {
          // second param is the array query - in this case it is empty
          tx.executeSql(
            'SELECT Username, Email, Password FROM Users',
            [],
            (tx, results) => {
              // if successfull this function will return the result of the query
              var len = results.rows.length;
              for (i = 0; i < len; i++) {
                console.log(results.rows.item(i));
              }
              if (len > 0 && signOut == false) {
                // table isn't empty:
                const obj = JSON.stringify(results.rows.item(0));
                console.log('hello ' + obj);
                // navigate to the home page
                navigation.navigate('HomeScreen');
              } else {
                console.warn('we signed out.');
              }
            },
          );
        },
        err => {
          // if not successfull -
          console.warn('an error occurred when getting data from table.');
        },
        () => {
          // if successfull -
          console.warn('successfully received data from table.');
        },
      );
    } catch (error) {
      // when transaction did not work as expected
      console.log('get data did not work as planned ' + error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <Image
          source={MicMarkLogo}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />
        <CustomInput
          name="username"
          placeholder="Username"
          control={control}
          rules={{required: 'Username is required'}}
        />

        <CustomInput
          name="password"
          placeholder="Password"
          secureTextEntry
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 3,
              message: 'Password should be minimum 3 characters long',
            },
          }}
        />

        <CustomButton
          text={loading ? 'Loading...' : 'Sign In'}
          onPress={handleSubmit(onSignInPressed)}
        />

        <CustomButton
          text="Forgot password?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />
        <SocialSignInButtons />
        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPressed}
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
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },
});
export default SignInScreen;
