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

const MovieCarousel = ({title, items, navigation}) => {
  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title} 💜</Text>
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
    fontSize: 20,
    paddingBottom: 10,
    color: '#f58f84',
    fontFamily: 'Pacifico-Regular',
  },
});
export default MovieCarousel;
