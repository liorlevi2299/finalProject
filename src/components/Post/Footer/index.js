import React, {useState} from 'react';
import styles from './styles';
import {Text, View, TouchableWithoutFeedback, Pressable} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Comment from '../../Comment';
import {useNavigation} from '@react-navigation/core';
import Axios from 'axios';

const API_URL =
  Platform.OS === 'ios' ? 'http://localhost:3001' : 'http://10.0.0.30:3001';

const data = [
  {
    id: '1',
    user: {
      imageUri:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe7FaZ1c0jggZP_BwENoJHT8ah5CleWermxg&usqp=CAU',
      name: 'Rabbit1',
    },
    imageUri:
      'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
    caption: 'merav the monkey!',
    likesCount: 230,
    postedAt: '4 minutes ago',
  },
  {
    id: '2',
    user: {
      imageUri:
        'https://images.ctfassets.net/hrltx12pl8hq/3S2SU0TMDRq4uMvB0qMBn4/9c51325d17911f4448fa1643b4169b31/03-animals-wildlife_1182593230.jpg?fit=fill&w=480&h=270',
      name: 'Elephant1',
    },
    imageUri:
      'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
    caption: 'Sunset!',
    likesCount: 400,
    postedAt: '4 minutes ago',
  },
  {
    id: '3',
    user: {
      imageUri:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe7FaZ1c0jggZP_BwENoJHT8ah5CleWermxg&usqp=CAU',
      name: 'Rabbit1',
    },
    imageUri:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png',
    caption: 'Road!',
    likesCount: 2322,
    postedAt: '4 days ago',
  },
];

const Footer = ({likesCount, caption, postedAt, postId}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(likesCount);
  const [commentList, setCommentList] = useState([]);
  const navigation = useNavigation();

  const onLikePressed = () => {
    setIsLiked(!isLiked);
    if (isLiked) {
      setNumLikes(numLikes - 1);
    } else {
      setNumLikes(numLikes + 1);
    }
  };

  const onCommentPressed = () => {
    console.warn('pressed comment');
    console.log('footer' + postId);
    Axios.get(`${global.api_url}/api/select_comments`, {
      params: {
        postId,
      },
    })
      .then(response => {
        setCommentList(response.data);
        console.log(response.data);
        navigation.navigate('CommentListScreen', {
          postId: postId,
          commentList: response.data,
        });
      })
      .catch(err => {
        console.log("get in comment list didn't work" + err);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconsConatiner}>
        <View style={styles.leftIcons}>
          <TouchableWithoutFeedback onPress={onLikePressed}>
            {isLiked ? (
              <IconAntDesign
                name="heart"
                size={25}
                style={{color: '#f75e5f'}}
              />
            ) : (
              <IconAntDesign name="hearto" size={25} style={[styles.icon]} />
            )}
          </TouchableWithoutFeedback>
          <Pressable onPress={onCommentPressed}>
            <Ionicons name="chatbubble-outline" size={25} style={styles.icon} />
          </Pressable>
          <Ionicons name="paper-plane-outline" size={25} style={styles.icon} />
        </View>
        <View style={styles.rightIcons}>
          <FontAwesome name="bookmark-o" size={25} style={styles.icon} />
        </View>
      </View>
      <Text style={styles.likes}> {numLikes} Likes</Text>
      <Text style={styles.caption}> {caption}</Text>
      <Text style={styles.postedAt}> {postedAt}</Text>
    </View>
  );
};

export default Footer;
