import React from 'react';
import styles from './styles';
import {Text, View} from 'react-native';
import ProfilePicture from '../../ProfilePicture';
import IconAntDesign from 'react-native-vector-icons/Entypo';

const Header = ({imageUri, name}) => {
  return (
    <View style={styles.conatiner}>
      <View style={styles.left}>
        <ProfilePicture uri={imageUri} size={45} />
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={styles.right}>
        <IconAntDesign name="dots-three-vertical" size={20} />
      </View>


    </View>
  );
};

export default Header;
