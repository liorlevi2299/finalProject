import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    borderBottomColor: '#889094',
    borderBottomWidth: 0.5,
  },
  containerHeader: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
  },
  captionContainer: {
    paddingLeft: 7,
    paddingRight: 7,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  text: {
    fontWeight: '300',
    fontSize: 18,
    paddingBottom: 10,
  },
  date: {
    fontSize: 16,
    color: '#889094',
    paddingLeft: 10,
  },
});
