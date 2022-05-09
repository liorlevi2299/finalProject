import React from 'react';
import {SafeAreaView} from 'react-native';
// import Feed from '../../components/Feed';
import Feed from '../../../components/Feed';

const HomeScreen = () => {
  return (
    <>
      <SafeAreaView>
        <Feed />
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
