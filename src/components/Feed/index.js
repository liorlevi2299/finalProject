import React from 'react';
import {Text, View} from 'react-native';
import {FlatList} from 'react-native';
import Stories from '../UserStoriesPreview/index';
import Post from '../Post';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

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

// import elephant from '../../assets/images/elephant.webp';
// import sunset from '../../assets/images/sunset.webp';
// import road from '../../assets/images/road.png';
// import rabbit from '../../assets/images/rabbit.jpg';
// const data = [
//   {
//     id: '1',
//     user: {
//       imageUri: rabbit,
//       name: 'Elephant',
//     },
//     imageUri: elephant,
//     caption: 'merav the monkey!',
//     likesCount: 230,
//     postedAt: '4 minutes ago',
//   },
//   {
//     id: '2',
//     user: {
//       imageUri: elephant,
//       name: 'Elephant1',
//     },
//     imageUri: sunset,
//     caption: 'Sunset!',
//     likesCount: 400,
//     postedAt: '4 minutes ago',
//   },
//   {
//     id: '3',
//     user: {
//       imageUri: rabbit,
//       name: 'Rabbit1',
//     },
//     imageUri: road,
//     caption: 'Road!',
//     likesCount: 2322,
//     postedAt: '4 days ago',
//   },
// ];

const Feed = () => {
  return (
    <View style={{backgroundColor: '#faf7f7'}}>
      <FlatList
        data={data}
        keyExtractor={({id}) => id}
        renderItem={({item}) => <Post post={item} />}
        ListHeaderComponent={Stories}
      />
    </View>
  );
};

export default Feed;
