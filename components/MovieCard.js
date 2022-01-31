import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';

const MovieCard = ({
  title,
  images,
  navigation,
  trailer,
  score,
  synopsis,
  year,
  season,
  status,
  duration,
  rating,
  episodes,
  genres,
}) => {
  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() =>
          navigation.navigate('Anime Details', {
            title,
            images,
            trailer,
            score,
            synopsis,
            year,
            season,
            status,
            duration,
            rating,
            episodes,
            genres,
          })
        }>
        <Image
          source={
            images?.webp.large_image_url
              ? {uri: `${images.webp.large_image_url}`}
              : require('../assets/images/placeholder.png')
          }
          resizeMode="cover"
          style={styles.image}></Image>
        {!images.webp.large_image_url && (
          <Text style={styles.placeholderText}>{title}</Text>
        )}
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    marginBottom: 5,
  },
  image: {
    width: 150,
    height: 200,
    borderRadius: 20,
  },
  placeholderText: {
    position: 'absolute',
    color: 'black',
    width: 100,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
export default MovieCard;
