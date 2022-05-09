import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
//import StepcounterIosAndroid from "react-native-stepcounter-ios-android";
import {NativeEventEmitter, NativeModules} from 'react-native';
import {startCounter, stopCounter} from 'react-native-accurate-step-counter';

// // const StepCounter = () => {
// //     const [steps, setSteps] = useState(0);

// //     useEffect(() => {
// //         StepcounterIosAndroid.isSupported()
// //         .then((result) => {
// //             if (result) {
// //             console.log('Sensor TYPE_STEP_COUNTER is supported on this device');

// //             const myModuleEvt = new NativeEventEmitter(
// //                 NativeModules.StepcounterIosAndroid
// //             );
// //             myModuleEvt.addListener('StepCounter', (data) => {
// //                 setSteps(data.steps);
// //                 console.log('STEPS', data.steps);
// //             });

// //             StepcounterIosAndroid.startStepCounter();
// //             } else {
// //             console.log(
// //                 'Sensor TYPE_STEP_COUNTER is not supported on this device'
// //             );
// //             }
// //         })
// //         .catch((err) => console.log(err));

// //         return () => StepcounterIosAndroid.stopStepCounter();
// //     }, []);
// //     return (

// //         <View style={styles.screen}>
// //          <Text style={styles.step}>Daily steps </Text>
// //          <Text style={styles.step}>{steps}</Text>
// //         </View>
// //     )
// // };
// // export default StepCounter;

//another
const StepCounter = () => {
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    const config = {
      default_threshold: 15.0,
      default_delay: 250000000,
      cheatInterval: 3000,
      onStepCountChange: stepCount => {
        setSteps(stepCount);
      },
      onCheat: () => {
        console.log('User is Cheating');
      },
    };
    startCounter(config);
    return () => {
      stopCounter();
    };
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Text style={styles.step}>Daily steps </Text>
        <Text style={styles.step}>{steps}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  step: {
    fontSize: 36,
  },
});

export default StepCounter;
