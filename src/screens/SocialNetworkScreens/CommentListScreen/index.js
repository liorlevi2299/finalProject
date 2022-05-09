import {View, Text, FlatList, TextInput, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import CustomButton from '../../../components/CustomButton';
import {useRoute} from '@react-navigation/native';
import Comment from '../../../components/Comment';
import CustomInput from '../../../components/CustomInput';
// import database from '../../../../database';
import styles from './styles';


const API_URL =
  Platform.OS === 'ios' ? 'http://localhost:3001' : 'http://172.19.3.207:3001';

const CommentListScreen = () => {
  const route = useRoute();
  //   database.sayHi();
  //   console.log('2' + commentList);
  //   const [commentList, setCommentList] = useState([]);
  const postId = route.params.postId;
  const commentList = route.params.commentList;
  const onButtonPressed = () => {
    console.log(commentList);
    console.log('hello' + postId);
  };

  const [postText, setPostText] = useState('');
  const onPostPressed = () => {
    console.log('posting');
    console.log(postText);
  };
const onClear= () => {
  setPostText('');
};
  //   useEffect(() => {
  //     setCommentList(comment_List);
  //   }, commentList);
  //   const [commentList, setCommentList] = useState(comment_list);

  //   useEffect(() => {
  //     Axios.get(`${API_URL}/api/select_comments`, {
  //       post_id: postId,
  //     })
  //       .then(response => {
  //         setCommentList(response.data);
  //         console.log(response.data);
  //       })
  //       .catch(err => {
  //         console.log("get in comment list didn't work" + err);
  //       });
  //   });

  return (
    <View style={{flex: 1}}>
      <CustomButton text="testing" onPress={onButtonPressed} />
      <FlatList
        data={commentList}
        keyExtractor={({idcomments}) => idcomments}
        renderItem={({item}) => <Comment comment={item} />}
      />
      <View style={styles.container}>
        <TextInput
          onChangeText={text => setPostText(text)}
          style={styles.postInput}
          placeholder="enter comment"></TextInput>
        <TouchableOpacity style={styles.button} onPress={onPostPressed}>
          <Text style={styles.buttonText}>post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentListScreen;
