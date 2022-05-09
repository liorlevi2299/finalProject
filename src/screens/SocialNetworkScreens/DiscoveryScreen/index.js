import React from 'react';
import {Text, View, Image} from 'react-native';
// import logo from '
import logo from '../../../../assets/images/logo.webp';
const DiscoveryScreen = () => {
  return (
    <View style={{backgroundColor: '#FDCBCB', height: '100%'}}>
      <Text>Discovery screen</Text>
      <Image source={logo} style={{ width: '100%'}}/>
    </View>
  );
};

export default DiscoveryScreen;
