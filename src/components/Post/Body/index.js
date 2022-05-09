import React from 'react';
import {Text, Image, View} from 'react-native';
import styles from './styles';
// import photo from '../../../assets/images/img.jpg';
import photo from '../../../../assets/images/img.jpg';

const Body = ({imageUri}) => {
  return (
    <View>
      <Image
        source={{
          uri: imageUri,
        }}
        // source={imageUri}
        style={styles.image}
      />
    </View>
  );
};

export default Body;
