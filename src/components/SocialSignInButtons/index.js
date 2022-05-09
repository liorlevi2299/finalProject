import { View, Text } from 'react-native'
import React from 'react'
import CustomButton from '../CustomButton'

const onSignInFacebookPressed = () => {
  console.warn('facebook');
};

const onSignInGooglePressed = () => {
  console.warn('google');
};


const SocialSignInButtons = () => {
  return (
    <>
      <CustomButton
        text="Sign In with Facebook"
        onPress={onSignInFacebookPressed}
        bgColor="#E7EAF4"
        fgColor="#4765A9"
      />
      <CustomButton
        text="Sign In with Google"
        onPress={onSignInGooglePressed}
        bgColor="#FAE9EA"
        fgColor="#DD4D44"
      />
    </>
  );
};

export default SocialSignInButtons