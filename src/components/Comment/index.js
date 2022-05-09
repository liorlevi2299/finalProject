import {View, Text, Image} from 'react-native';
import React from 'react';
import style from './style';
import ProfilePicture from '../ProfilePicture';

const Comment = ({comment = {}}) => {
  const formatDateString = d => {
    // console.log('comment' + d);
    // console.log(typeof d);
    // console.log( String(d).split(' '));

    let [date, time] = [...String(d).split(' ')];

    // clear seconds
    const [h, m, s] = [...String(time).split(':')];
    time = `${h}:${m}`;

    // format date to israel-format
    date = new Date(date);
    date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    // console.log(time + ' ' + date);
    return time + ' ' + date;
  };
  //   console.log(JSON.stringify(comment));
  const name = comment.author;
  const text = comment.text_comment;
  console.log(comment.date);
  const uploadDate = formatDateString(comment.date);

  return (
    <View style={style.container}>
      <View style={style.containerHeader}>
        <ProfilePicture
          uri={
            'https://images.ctfassets.net/hrltx12pl8hq/3S2SU0TMDRq4uMvB0qMBn4/9c51325d17911f4448fa1643b4169b31/03-animals-wildlife_1182593230.jpg?fit=fill&w=480&h=270'
          }
          size={35}
        />
        <Text style={style.name}>{name}</Text>
      </View>
      <View style={style.captionContainer}>

          <Text style={style.text}>
            {text} היי אני ליאור לוי מה שלומך הילה לוי
          </Text>
      </View>
      <Text style={style.date}>{uploadDate}</Text>
    </View>
  );
};

export default Comment;
