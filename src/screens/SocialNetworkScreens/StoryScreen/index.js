import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  SafeAreaView,
  ImageBackground,
  ActivityIndicator,
  Dimensions,
  TextInput,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';

import storiesData from '../../../data/stories';
import styles from './styles';
import ProfilePicture from '../../../components/ProfilePicture';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const StoryScreen = () => {
  const [userStories, setUserStories] = useState(null); // the stracture of user, that contains the stories
  const [activeStoryIndex, setActiveStoryIndex] = useState(null);

  const route = useRoute();
  const navigation = useNavigation();
  const userId = route.params.userId;

  // will be activated when React "renders" the component for the first time and actually builds the initial DOM from those instruction
  useEffect(() => {
    // find the story in the data file
    const userStories = storiesData.find(
      storyData => storyData.user.id === userId,
    );
    setUserStories(userStories);
    setActiveStoryIndex(0);
  }, []);

  const navigateToNextUser = () => {
    navigation.push('Story', {userId: parseInt(userId) + 1});
  };

  const navigateToPrevUser = () => {
    navigation.push('Story', {userId: parseInt(userId) - 1});
  };

  // whenever the activeStoryIndex changes, this will run
  useEffect(() => {
    if (!userStories) {
      return;
    }
    if (activeStoryIndex < 0) {
      setActiveStoryIndex(0);
      return;
    }

    if (activeStoryIndex >= userStories.stories.length) {
      setActiveStoryIndex(userStories.stories.length - 1);
    }
  }, [activeStoryIndex]);

  const handleNextStory = () => {
    if (activeStoryIndex >= userStories.stories.length - 1) {
      navigateToNextUser();
      return;
    }
    setActiveStoryIndex(activeStoryIndex + 1);
  };

  const handlePrevStory = () => {
    if (activeStoryIndex <= 0) {
      navigateToPrevUser();
      return;
    }
    setActiveStoryIndex(activeStoryIndex - 1);
  };

  // checking if the user pressed on the right side of the screen or the right:
  const handlePress = evt => {
    const x = evt.nativeEvent.locationX;
    const screenWidth = Dimensions.get('window').width;
    if (x < screenWidth / 2) {
      handlePrevStory();
    } else {
      handleNextStory();
    }
  };

  // the component isnt loaded yet
  if (!userStories) {
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  const activeStory = userStories.stories[activeStoryIndex];

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <ImageBackground
          source={{uri: activeStory.imageUri}}
          style={styles.image}>
          <View style={styles.userInfo}>
            <ProfilePicture uri={userStories.user.imageUri} size={50} />
            <Text style={styles.userName}>{userStories.user.name}</Text>
            <Text style={styles.postedTime}>{activeStory.postedTime}</Text>
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.buttons}>
              <Feather
                name={'camera'}
                size={27}
                style={{padding: 5, color: 'white'}}
              />
            </View>
            <View style={styles.textInputContainer}>
              <TextInput style={styles.textInput} editable
              placeholder='Send message...' placeholderTextColor={'#f7f7f7'}/>
            </View>
            <View style={styles.buttons}>
              <Ionicons
                name="paper-plane-outline"
                size={25}
                style={{padding: 5, color: 'white'}}
              />
            </View>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default StoryScreen;
