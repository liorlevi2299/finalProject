import {StyleSheet} from 'react-native';
import {white} from 'react-native-paper/lib/typescript/styles/colors';

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'space-between',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    margin: 5,
  },
  userName: {
    color: 'white',
    fontWeight: '500',
    fontSize: 17,
  },
  postedTime: {
    color: '#808080',
    fontWeight: '500',
    fontSize: 16,
    marginLeft: 20
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 7,
    paddingBottom: 15,
    alignItems: 'center',
  },
  textInputContainer: {
    flex: 1,
    borderWidth: 1.5,
    borderRadius: 50,
    borderColor: '#f75e5f',
    marginHorizontal: 5,
    paddingHorizontal: 10,
  },
  buttons: {
    borderColor: 'white',
    borderWidth: 1,
    borderColor: '#f75e5f',
    borderRadius: 25,
    margin: 4,
  },
  textInput: {
    color: 'white',
    fontSize: 16,
  },
});

export default styles;
