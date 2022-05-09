import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  PermissionsAndroid,
  Alert,
  Platform,
} from 'react-native';
import CallActionBox from '../../../components/CallActionBox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/core';
import {Voximplant} from 'react-native-voximplant';
// import { render } from 'react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod';


const permissions = [
  PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  PermissionsAndroid.PERMISSIONS.CAMERA,
];

const CallingScreen = () => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [callStatus, setCallStatus] = useState('Initializing...');
  const [localVideoStreamId, setLocalVideoStreamId] = useState('');
  const [remoteVideoStreamId, setRemoteVideoStreamId] = useState('');

  const [isAudioMuted, setAudioMuted] = useState(true);
  const [isCamOn, setCamOn] = useState(true);
  const [isCamReverse, setCamReverse] = useState(false);

  const [isCamOnButton, setCamOnButton] = useState(true);
  const [isMicOnButton, setIsMicOnButton] = useState(true); //for callactionbox

  const navigation = useNavigation();
  const route = useRoute(); //acsess to agruments: example-user from contacts screen

  const {user, call: incomingCall, isIncomingCall} = route?.params; //get the arguments from other screens

  const voximplant = Voximplant.getInstance();

  const call = useRef(incomingCall);
  const endpoint = useRef(null);

  const goBack = () => {
    navigation.pop();
  };

  useEffect(() => {
    const getPermissions = async () => {
      const granted = await PermissionsAndroid.requestMultiple(permissions);
      const recordAudioGranted =
        granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === 'granted';
      const cameraGranted =
        granted[PermissionsAndroid.PERMISSIONS.CAMERA] === 'granted';
      if (!cameraGranted || !recordAudioGranted) {
        Alert.alert('Permissions not granted');
      } else {
        setPermissionGranted(true);
      }
    };

    if (Platform.OS === 'android') {
      getPermissions();
    } else { //ios - not required to get premission
      setPermissionGranted(true);
    }
  }, []);

  useEffect(() => {
    if (!permissionGranted) {
      return;
    }
    //else - there are premissions
    
    const callSettings = { //setting of the call
      video: {
        sendVideo: true,
        receiveVideo: true,
      },
    };

    const makeCall = async () => {
      call.current = await voximplant.call(user.user_name, callSettings);
      subscribeToCallEvents();
      //set speaker
      const device = Voximplant.Hardware.AudioDevice.SPEAKER
      console.log('----------------------device : ' + device);
      Voximplant.Hardware.AudioDeviceManager.getInstance().selectAudioDevice(device);
      let currentAudioDevice = await Voximplant.Hardware.AudioDeviceManager.getInstance().getActiveDevice();
      console.log('----------------------: ' + currentAudioDevice);


    };

    const answerCall = async () => {
      subscribeToCallEvents();
      endpoint.current = call.current.getEndpoints()[0];
      subscribeToEndpointEvent();
      call.current.answer(callSettings);
    };


    const subscribeToCallEvents = () => { 
      call.current.on(Voximplant.CallEvents.Failed, callEvent => {
        showError(callEvent.reason);
      });
      call.current.on(Voximplant.CallEvents.ProgressToneStart, callEvent => {
        setCallStatus('Calling...'); //show the status on the screen
      });
      call.current.on(Voximplant.CallEvents.Connected, callEvent => {
        setCallStatus('Connected'); //show the status on the screen
      });
      call.current.on(Voximplant.CallEvents.Disconnected, callEvent => {
        navigation.navigate('Contacts');
      });
      call.current.on(
        Voximplant.CallEvents.LocalVideoStreamAdded,
        callEvent => {
          setLocalVideoStreamId(callEvent.videoStream.id);
        },
      );
      call.current.on(Voximplant.CallEvents.EndpointAdded, callEvent => { //call when the second user join the call
        endpoint.current = callEvent.endpoint;
        subscribeToEndpointEvent();
      });


    };
    const subscribeToEndpointEvent = async () => { //listen to the user action like on/stop camera
      endpoint.current.on(
        Voximplant.EndpointEvents.RemoteVideoStreamAdded,
        endpointEvent => {
          setRemoteVideoStreamId(endpointEvent.videoStream.id); //save the id when someome join
    
        },  
      );
    };

    const showError = reason => {
      Alert.alert('Call failed', `Reason: ${reason}`, [
        {
          text: 'Ok',
          onPress: navigation.navigate('Contacts'),
        },
      ]);
    };

    if (isIncomingCall) {
      answerCall();
    } else {
      makeCall();
    }

    return () => {
      call.current.off(Voximplant.CallEvents.Failed);
      call.current.off(Voximplant.CallEvents.ProgressToneStart);
      call.current.off(Voximplant.CallEvents.Connected);
      call.current.off(Voximplant.CallEvents.Disconnected);
    };
  }, [permissionGranted]);

  const onHangupPress = () => {
    call.current.hangup(); //will triger diconnected event in subscribeToCallEvents and go back to contacts
  };

  const onMutePress = () => {
    setIsMicOnButton(currentValue => !currentValue);
    call.current.sendAudio(!isAudioMuted);
    setAudioMuted(!isAudioMuted)

    
  };


  const onSendVideoPress = async () => { //isCamOn
    setCamOnButton(currentValue => !currentValue);
    console.log('CallScreen[' + call.current.callId + '] sendVideo: ' + isCamOn);
    try {
      if (isCamOn && Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.warn('CallScreen[' + call.current.callId + '] sendVideo: failed due to camera permission is not granted');
            return;
        }
      }
      await call.current.sendVideo(!isCamOn);
      setCamOn(!isCamOn)
    } catch (e) {
        console.warn(`Failed to sendVideo(${isCamOn}) due to ${e.code} ${e.message}`);
    }

  };


  const onReverseCameraPress = async () => { 
    setCamReverse(!isCamReverse)

    const back = Voximplant.Hardware.CameraType.BACK
    const front = Voximplant.Hardware.CameraType.FRONT

    if(isCamReverse) {
      Voximplant.Hardware.CameraManager.getInstance().switchCamera(front);
    } else {
      Voximplant.Hardware.CameraManager.getInstance().switchCamera(back);
    }
    
  }

  

  return (
    <SafeAreaView style={styles.page}>
        <View style={{ flex: 1,flexDirection: 'column',}}>
          <View style={styles.videoPanel}>

            <Voximplant.VideoView style={styles.remoteVideo} videoStreamId={remoteVideoStreamId}
              scaleType={Voximplant.RenderScaleType.SCALE_FIT}/>
            {isCamOn ? (
              <Voximplant.VideoView style={styles.localVideo} videoStreamId={localVideoStreamId}
                scaleType={Voximplant.RenderScaleType.SCALE_FIT} showOnTop={true}/>
            ) : null  }
          </View>      
          
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{ fontSize: 18, alignSelf: 'center',  color: 'black', fontWeight: 'bold',}}> 
              {callStatus}
            </Text>
          </View>
          
          <CallActionBox onHangupPress={onHangupPress} onMutePress={onMutePress} isMicOnButton={isMicOnButton}
            onSendVideoPress={onSendVideoPress} isCamOnButton={isCamOnButton} onReverseCameraPress={onReverseCameraPress}
          /> 
        </View>
    </SafeAreaView>
  );
  
}


const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',

  },
  localVideo: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 140,
    height: 170,
  },
  remoteVideo: {
    flex: 1,
  },
  previewCamera: {
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'flex-start', 
    alignItems: 'center',
  },
  name: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  phoneNumber: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    color: 'black',
    
  },videoPanel: {
    flex: 1,
    position: 'relative',
  },
});

export default CallingScreen;