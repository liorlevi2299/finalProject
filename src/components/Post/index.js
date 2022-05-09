import React from 'react';
import {View, Image, Text} from 'react-native';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import omg from '../../../assets/images/img.jpg';

const Post = ({post}) => {
  return (
    <View style={styles.conatiner}>
      <Header imageUri={post.user.imageUri} name={post.user.name} />
      <Body imageUri={post.imageUri} />
      <Footer
        likesCount={post.likesCount}
        caption={post.caption}
        postedAt={post.postedAt}
        postId={post.id}
      />
    </View>
  );
};

export default Post;
