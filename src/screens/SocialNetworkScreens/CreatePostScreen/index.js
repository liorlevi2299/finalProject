import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import {useForm} from 'react-hook-form';
import Axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';

const API_URL =
  Platform.OS === 'ios' ? 'http://localhost:3001' : 'http://10.0.0.13:3001';

const CreatePostScreen = () => {
  const {control, handleSubmit, watch} = useForm();
  const captionText = watch('captionText');

  const [image, setImage] = useState();
  const TakePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImage(image.path);
    });
  };

  const TakePhotoFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImage(image.path);
    });
  };

  const onUploadPressed = () => {
    console.log(global.username);
    global.username = 'hila';
    console.log(global.username);
    Axios.post(`${API_URL}/api/insert_posts`, {
      captionText: captionText,
    })
      .then(() => {
        console.log('successfully inserted.');
      })
      .catch(err => {
        console.log('not successfully inserted.' + err.message);
      });
  };
  return (
    <>
      <CustomInput
        name="captionText"
        control={control}
        rules={{
          required: 'caption text is required',
        }}
        placeholder="Enter Caption"
      />
      {/* {remeber to change to get image from gallery} */}
      <CustomInput name="image" control={control} />
      <CustomButton text="Upload" onPress={handleSubmit(onUploadPressed)} />
      <TouchableOpacity style={styles.button} onPress={TakePhotoFromCamera}>
        <Text style={styles.text}>Photo from camera</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={TakePhotoFromGallery}>
        <Text style={styles.text}>Photo from gallery</Text>
      </TouchableOpacity>
      <ImageBackground source={{uri: image}} style={styles.image} />
    </>
  );
};

export default CreatePostScreen;

const styles = StyleSheet.create({
  button: {
    margin: 10,
    height: 100,
    width: 100,
    backgroundColor: 'red',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    paddingLeft: 8,
    paddingTop: 8,
  },
  image: {
    height: 100,
    width: 100,
  },
});
