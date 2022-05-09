import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginLeft: 3,
  },
  iconsConatiner: {
    flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 10,
      marginTop: 3
  },
  leftIcons: {
    flexDirection: 'row', 
    width: 120, 
    justifyContent: 'space-between', 
  },
  likes: {
    margin: 2,
    fontWeight: 'bold',
  },
  caption: {
    margin: 2,
  },
  postedAt: {
    margin: 2,
    color: '#8c8c8c',
  },

  rightIcons: {
  },
  icon: {
    color: '#454545',
  },
});

export default styles;
