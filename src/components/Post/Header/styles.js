import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  conatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  name: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#4f4f4f',
  },
  left: {
    alignContent: 'flex-end',
    flexDirection: 'row',
  },
  right: {
    marginRight: 10,   
  },

});

export default styles;
