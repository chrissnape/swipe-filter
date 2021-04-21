import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 1,
    width: '50%'
  },
  gradient_left: {
    left: 0,
  },
  gradient_right: {
    right: 0,
  },
  itemWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    fontSize: 20,
  },
});
