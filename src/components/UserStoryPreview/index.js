import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import ProfilePicture from '../ProfilePicture';
import {useNavigation} from '@react-navigation/native';

const Story = props => {
  const {
    story: {
      user: {id, imageUri, name},
    },
  } = props;

  const onPress = () => {
    navigation.navigate('Story', {userId: id});
  };

  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.conatiner} onPress={onPress}>
      <ProfilePicture uri={imageUri} />
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};

export default Story;
