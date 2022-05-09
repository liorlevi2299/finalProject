import React, {useEffect, useState, useRef} from 'react';
import {View, TouchableOpacity,Image, Text, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/core';
import HomeActionBox from '../../components/HomeActionBox';
import logo from '../../../assets/images/logo.webp';


const Logo = () => {
    return (
        <View  style={{ alignItems: 'center', backgroundColor: '#ebaba7',}}>
            <Image
                source={logo}
                resizeMode="contain"
                style={{width: 150, height: 50, }}
            />
        </View> 
    )

}

export default Logo;

