import {
  View,
  Text,
  ScrollView,
  Image,
  Modal,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import PlayButton from '../components/PlayButton';
import StarRating from 'react-native-star-rating';
// import VideoPlayer from 'react-native-video-controls';
const dimensions = Dimensions.get('screen').height;

const Anime = ({route}) => {
  const {
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
  } = route.params;
  const [numberOfLines, setNumberofLines] = useState(2);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={{backgroundColor: '#044f67', flex: 1}}>
      <ScrollView>
        <Image
          source={
            images?.webp.large_image_url
              ? {uri: `${images.webp.large_image_url}`}
              : require('../assets/images/placeholder.png')
          }
          resizeMode="contain"
          style={styles.image}
        />
        <View style={styles.container}>
          <View style={styles.playButtonContainer}>
            <PlayButton handlePress={() => setModalVisible(true)} />
          </View>
          <Text style={styles.movieTitle}>{title}</Text>
          <View style={styles.genreContainer}>
            {genres.map((genre, index) => (
              <Text style={styles.genreText} key={genre.name + index}>
                {genre.name}
              </Text>
            ))}
          </View>
          <StarRating
            disabled={true}
            maxStars={5}
            rating={score / 2}
            fullStarColor={'gold'}
            starSize={30}
          />
          <Text style={styles.text}>Year of Release: {year}</Text>
          <Text style={styles.text}>Status: {status}</Text>
          <Text style={styles.text}>Duration: {duration}</Text>
          <Text style={styles.text}>{rating}</Text>
          <View style={styles.extraTextContainer}>
            <Text
              style={styles.synopsis}
              ellipsizeMode="middle"
              numberOfLines={numberOfLines}>
              Summary: {synopsis}
            </Text>
            {numberOfLines === 2 ? (
              <Text
                style={styles.extraText}
                onPress={() => setNumberofLines(null)}>
                See More
              </Text>
            ) : (
              <Text
                style={styles.extraText}
                onPress={() => setNumberofLines(2)}>
                See Less
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
      <Modal
        style={styles.modal}
        supportedOrientations={['portrait', 'landscape']}
        animationType="slide"
        visible={modalVisible}>
        {/* <VideoPlayer
            source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
            onPress={() => setModalVisible(!modalVisible)}
          /> */}
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: dimensions / 2,
  },
  movieTitle: {
    fontSize: 32,
    padding: 10,
    marginTop: 10,
    color: '#f58f84',
    fontFamily: 'CuteFont-Regular',
  },
  genreContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 15,
  },
  genreText: {
    marginRight: 5,
    fontSize: 22,
    color: 'white',
    fontFamily: 'CuteFont-Regular',
  },
  text: {
    marginTop: 3,
    fontSize: 18,
    color: 'white',
    fontFamily: 'CuteFont-Regular',
  },
  synopsis: {
    marginTop: 3,
    fontSize: 22,
    color: 'white',
    fontFamily: 'CuteFont-Regular',
  },
  extraText: {
    marginBottom: 10,
    fontSize: 18,
    color: '#f58f84',
    fontFamily: 'CuteFont-Regular',
  },
  extraTextContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'flex-start',
    margin: 10,
    fontSize: 22,
    color: 'white',
    fontFamily: 'CuteFont-Regular',
  },
  playButtonContainer: {
    position: 'absolute',
    top: -20,
    right: 20,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
export default Anime;
