import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import DatePicker from 'react-native-date-picker';
import Axios from 'axios';

const API_URL =
  Platform.OS === 'ios'
    ? 'http://localhost:3001'
    : 'http://192.168.43.211:3001';
const URL_OUT = '213.57.206.111';

const FillInDataScreen = () => {
  const formatDateString = d => {
    // console.log('comment' + d);
    // console.log(typeof d);
    // console.log( String(d).split(' '));

    let [date, time] = [...String(d).split(' ')];

    // // clear seconds
    // const [h, m, s] = [...String(time).split(':')];
    // time = `${h}:${m}`;

    // format date to israel-format
    date = new Date(d);
    console.log(date.getDate());
    console.log(date.getMonth() + 1);
    console.log(date.getFullYear());

    date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    // console.log(time + ' ' + date);
    return date;
  };

  //   const {name, setName} = useState('');
  //   const {weight, setWeight} = useState();
  //   const {height, setHeight} = useState();
  //   const {dueDate, setDueDate} = useState(new Date());
  //   const {week, setWeek} = useState();
  const [date, setDate] = useState(new Date()); // the due date of the baby
  console.log('initial date is: ' + date);
  const [open, setOpen] = useState(false); // open date picker on not
  const {control, handleSubmit, watch} = useForm();
  const name = watch('name');
  const weight = watch('weight');
  const height = watch('height');
  const week = watch('week');
  const dueDate = watch('dueDate');
  const onRegisterPressed = () => {
    Axios.post(`${global.api_url}/api/insert_womandata`, {
      name: name,
      weight: weight,
      week: week,
      height: height,
      dueDate: formatDateString(date),
    })
      .then(() => {
        console.log('successfully inserted womandata.');
      })
      .catch(err => {
        console.log('not successfully inserted.' + err.message);
      });
  };

  // formatDateString(date);

  return (
    <View>
      <CustomInput name="name" control={control} placeholder="Name" />
      <CustomInput name="weight" control={control} placeholder="Weight" />
      <CustomInput name="week" control={control} placeholder="Week" />
      <CustomInput name="height" control={control} placeholder="Height" />
      <>
        <CustomButton
          text="Insert Due Date Here"
          onPress={() => setOpen(true)}
          type="SECONDARY"
        />
        <DatePicker
          name="DueDate"
          modal
          open={open}
          date={date}
          mode="date"
          onConfirm={date => {
            setOpen(false);
            setDate(date);
            console.log('date is:' + date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </>
      <CustomButton text="Register" onPress={handleSubmit(onRegisterPressed)} />

      {/* <DatePicker name="dueDate" date={dueDate} onDateChange={setDueDate} /> */}
      {/* <CustomInput name="dueDate" control={control} placeholder="Due Date" /> */}
    </View>
  );
};

export default FillInDataScreen;
