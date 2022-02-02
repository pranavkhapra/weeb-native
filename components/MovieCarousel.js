import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  ScrollView,
} from 'react-native';
import React from 'react';
import MovieCard from './MovieCard';
import {colors} from '../themes/Color';

const MovieCarousel = ({title, items, navigation}) => {
  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <ScrollView>
        <FlatList
          horizontal={true}
          data={items}
          renderItem={({item}) => (
            <MovieCard {...item} navigation={navigation} />
          )}
        />
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 25,
    paddingLeft: 10,
  },
  titleText: {
    fontSize: 24,
    paddingBottom: 10,
    color: colors.headingColor,
    fontFamily: colors.fontFamilyForHeading,
  },
});
export default MovieCarousel;
