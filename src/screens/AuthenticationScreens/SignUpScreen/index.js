import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import SocialSignInButtons from '../../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import SQLite from 'react-native-sqlite-storage';
import {Auth} from 'aws-amplify';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const db = SQLite.openDatabase(
  {
    name: 'SQLiteDB',
    location: 'default',
  },
  () => {
    // if successfull - this will happen
    console.warn('data base successfully opened.');
  },
  err => {
    // if error occured - this will happen
    console.warn('data base could not open.');
  },
);

const SignUpScreen = () => {
  const {control, handleSubmit, watch} = useForm();
  const pwd = watch('password');
  const username = watch('username');
  const email = watch('email');

  const navigation = useNavigation();
  const onRegisterPressed = async data => {
    const {username, password, email, name} = data;
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {email, name, preferred_username: username},
      });
      setData();

      navigation.navigate('ConfirmEmailScreen', {username});
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
  };
  // const onRegisterPressed = () => {
  //   // save the data that's inside the use states.
  //   console.warn('register');
  //   setData();
  //   navigation.navigate('ConfirmEmailScreen');
  //   // navigate to the sign in page.
  // };

  const onSignInPress = () => {
    navigation.navigate('SignInScreen');
  };

  const onTermsOfUsePressed = () => {
    console.warn('onTermsOfUsePressed');
  };

  const onPrivacyPressed = () => {
    console.warn('onPrivacyPressed');
  };

  const deleteTable = tableName => {
    db.transaction(
      tx => {
        tx.executeSql('DROP TABLE Users');
      },
      err => {
        // if not successfull -
        console.warn('an error occurred when deleting the table.');
      },
      () => {
        // if successfull -
        console.warn('successfully deleted the table.');
      },
    );
  };

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

  const setData = async () => {
    try {
      await db.transaction(
        async tx => {
          await tx.executeSql(
            'INSERT INTO Users (Username, Email, Password) VALUES (?,?,?)',
            [username, email, pwd],
          );
        },
        err => {
          // if not successfull -
          console.warn(
            'an error occurred when inserting data to the table: ' +
              err.message,
          );
        },
        () => {
          // if successfull -
          console.warn('successfully inserted data to the table.');
        },
      );
    } catch (error) {
      // when transaction did not work as expected
      console.log('set data did not work as planned ' + error);
    }
    // if (username.length == 0 || email.length == 0 || password.length == 0) {
    //   Alert.alert('Warning!', 'Please write your data.');
    // } else {
    //   // check if password is correct
    //   if (password !== passwordRepeat) {
    //     Alert.alert('The password is incorrect. Try again.');
    //   } else {

    //   }
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
              if (len > 0) {
                // table isn't empty:
                // navigation.navigate('Home'); //???
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
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>
        <CustomInput
          name="name"
          control={control}
          placeholder="Name"
          rules={{
            required: 'Name is required',
          }}
        />
        <CustomInput
          name="username"
          control={control}
          placeholder="Username"
          rules={{
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Username should be at least 3 characters long',
            },
            maxLength: {
              value: 24,
              message: 'Username should be max 24 characters long',
            },
          }}
        />
        <CustomInput
          name="email"
          control={control}
          placeholder="Email"
          rules={{
            required: 'Email is required',
            pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
          }}
        />
        <CustomInput
          name="password"
          control={control}
          placeholder="Password"
          secureTextEntry
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters long',
            },
          }}
        />
        <CustomInput
          name="password-repeat"
          control={control}
          placeholder="Repeat Password"
          secureTextEntry
          rules={{
            validate: value => value === pwd || 'Password do not match',
          }}
        />

        <CustomButton
          text="Register"
          onPress={handleSubmit(onRegisterPressed)}
        />

        <Text style={styles.text}>
          By registering, you confirm that you accept our{' '}
          <Text style={styles.link} onPress={onTermsOfUsePressed}>
            Terms of Use
          </Text>{' '}
          and{' '}
          <Text style={styles.link} onPress={onPrivacyPressed}>
            Privacy Policy
          </Text>
        </Text>

        <SocialSignInButtons />

        <CustomButton
          text="Have an account? Sign in"
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

export default SignUpScreen;
export {db};

// import React, {useState, useEffect} from 'react';
// import {
//   Text,
//   View,
//   StyleSheet,
//   useWindowDimensions,
//   ScrollView,
//   Alert,
// } from 'react-native';
// import CustomInput from '../../components/CustomInput';
// import CustomButton from '../../components/CustomButton';
// import SocialSignInButtons from '../../components/SocialSignInButtons';

// import SQLite from 'react-native-sqlite-storage';

// const db = SQLite.openDatabase(
//   {
//     name: 'SQLiteDB',
//     location: 'default',
//   },
//   () => {
//     // if successfull - this will happen
//     console.warn('data base successfully opened.');
//   },
//   err => {
//     // if error occured - this will happen
//     console.warn('data base could not open.');
//   },
// );

// const SignUpScreen = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [passwordRepeat, setPasswordRepeat] = useState('');

//   const onSignInPressed = () => {
//     // redirect to the sign in screen
//     console.warn('sign in');
//   };

//   const onTermsOfUsePressed = () => {
//     // redirect to the terms of use page
//     console.warn('terms of use');
//   };

//   const onPrivacyPolicyPressed = () => {
//     // redirect to the privacy policy page
//     console.warn('privacy policy');
//   };

//   // useEffect(() => {
//   //   deleteTable();
//   //   createTable();
//   //   getData();
//   // }, []);

//   const onRegisterPressed = () => {
//     // save the data that's inside the use states.
//     console.warn('register');
//     setData();
//     // navigate to the sign in page.
//   };

//   const deleteTable = tableName => {
//     db.transaction(
//       tx => {
//         tx.executeSql('DROP TABLE Users');
//       },
//       err => {
//         // if not successfull -
//         console.warn('an error occurred when deleting the table.');
//       },
//       () => {
//         // if successfull -
//         console.warn('successfully deleted the table.');
//       },
//     );
//   };

//   const createTable = () => {
//     db.transaction(
//       tx => {
//         tx.executeSql(
//           'CREATE TABLE IF NOT EXISTS ' +
//             'Users' +
//             '(ID INTEGER PRIMARY KEY AUTOINCREMENT, Username TEXT, Email TEXT, Password TEXT);',
//         );
//       },
//       err => {
//         // if not successfull -
//         console.warn('an error occurred when creating the table.');
//       },
//       () => {
//         // if successfull -
//         console.warn('successfully created the table.');
//       },
//     );
//   };

//   const setData = async () => {
//     if (username.length == 0 || email.length == 0 || password.length == 0) {
//       Alert.alert('Warning!', 'Please write your data.');
//     } else {
//       // check if password is correct
//       if (password !== passwordRepeat) {
//         Alert.alert('The password is incorrect. Try again.');
//       } else {
//         try {
//           await db.transaction(
//             async tx => {
//               await tx.executeSql(
//                 'INSERT INTO Users (Username, Email, Password) VALUES (?,?,?)',
//                 [username, email, password],
//               );
//             },
//             err => {
//               // if not successfull -
//               console.warn(
//                 'an error occurred when inserting data to the table: ' +
//                   err.message,
//               );
//             },
//             () => {
//               // if successfull -
//               console.warn('successfully inserted data to the table.');
//             },
//           );
//         } catch (error) {
//           // when transaction did not work as expected
//           console.log('set data did not work as planned ' + error);
//         }
//       }
//     }
//   };

//   const getData = () => {
//     try {
//       db.transaction(
//         tx => {
//           // second param is the array query - in this case it is empty
//           tx.executeSql(
//             'SELECT Username, Email, Password FROM Users',
//             [],
//             (tx, results) => {
//               // if successfull this function will return the result of the query
//               var len = results.rows.length;
//               if (len > 0) {
//                 // table isn't empty:
//                 // navigation.navigate('Home'); //???
//               }
//             },
//           );
//         },
//         err => {
//           // if not successfull -
//           console.warn('an error occurred when getting data from table.');
//         },
//         () => {
//           // if successfull -
//           console.warn('successfully received data from table.');
//         },
//       );
//     } catch (error) {
//       // when transaction did not work as expected
//       console.log('get data did not work as planned ' + error);
//     }
//   };

//   const {height} = useWindowDimensions();
//   return (
//     <ScrollView>
//       <View style={styles.root}>
//         <Text style={styles.title}>Create An Account</Text>
//         <CustomInput
//           placeholder="UserName"
//           value={username}
//           setValue={setUsername}
//         />
//         <CustomInput placeholder="Email" value={email} setValue={setEmail} />
//         <CustomInput
//           placeholder="Password"
//           value={password}
//           setValue={setPassword}
//           secureTextEntry={true}
//         />
//         <CustomInput
//           placeholder="Repeat Password"
//           value={passwordRepeat}
//           setValue={setPasswordRepeat}
//           secureTextEntry={true}
//         />
//         <CustomButton text="Register" onPress={onRegisterPressed} />
//         <Text style={styles.text}>
//           By registering, you confirm that you accept our{' '}
//           <Text style={styles.link} onPress={onTermsOfUsePressed}>
//             Terms of Use
//           </Text>{' '}
//           and{' '}
//           <Text style={styles.link} onPress={onPrivacyPolicyPressed}>
//             Privacy Policy
//           </Text>
//         </Text>
//         <SocialSignInButtons />
//         <CustomButton
//           text="Have an account? Sign in"
//           onPress={onSignInPressed}
//           type="TERTIARY"
//         />
//       </View>
//     </ScrollView>
//   );
// };
// const styles = StyleSheet.create({
//   root: {
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#051c60',
//     margin: 10,
//   },
//   text: {
//     color: 'gray',
//     marginVertical: 10,
//   },
//   link: {
//     color: '#fdb075',
//   },
// });
// export default SignUpScreen;
// export {db};
