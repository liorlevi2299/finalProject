import React from 'react';
import {View, FlatList, Text} from 'react-native';
import styles from './styles';
import Story from '../UserStoryPreview';

import storiesData from '../../data/stories';

const UserStoriesPreview = () => {
  return (
    <FlatList
      style={styles.conatiner}
      data={storiesData}
      keyExtractor={({user: {id}}) => id}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => {
        return <Story story={item} />;
      }}
    />
  );
};

export default UserStoriesPreview;
