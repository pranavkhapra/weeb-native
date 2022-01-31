import {View, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
const PlayButton = ({handlePress}) => {
  return (
    <View>
      <Pressable onPress={() => handlePress()} style={styles.playButton}>
        <Icon color={'#f58f84'} name={'caret-forward-outline'} size={30} />
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  playButton: {
    width: 50,
    backgroundColor: '#5d3f6a',
    alignContent: 'center',
    padding: 10,
    borderRadius: 50,
  },
});
export default PlayButton;
