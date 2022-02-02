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
import YouTube from 'react-native-youtube';
import {colors} from '../themes/Color';
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
    <View style={{backgroundColor: colors.backgroundColor, flex: 1}}>
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
          {/* <View style={styles.playButtonContainer}>
            <PlayButton handlePress={() => setModalVisible(true)} />
          </View> */}
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
          <Text style={styles.movieTitle}>Youtube Trailer</Text>
          <View style={{width: '100%', padding: 4}}>
            <YouTube
              apiKey="AIzaSyB9a-UW9UZpyBqKl29Lmme-wbwvnFNpjU0"
              videoId={trailer.youtube_id} // The YouTube video ID
              play={false}
              fullscreen={false} // control whether the video should play in fullscreen or inline
              // onReady={e => this.setState({ isReady: true }ss
              style={{alignSelf: 'stretch', height: 300}}
            />
          </View>
        </View>
      </ScrollView>
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
    fontSize: 26,
    padding: 10,
    marginTop: 10,
    color: colors.headingColor,
    fontFamily: colors.fontFamilyForHeading,
  },
  genreContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 15,
  },
  genreText: {
    marginRight: 5,
    fontSize: 14,
    color: 'white',
    fontFamily: colors.fontFamilyForText,
  },
  text: {
    marginTop: 3,
    fontSize: 14,
    color: 'white',
    fontFamily: colors.fontFamilyForText,
  },
  synopsis: {
    marginTop: 3,
    fontSize: 14,
    color: 'white',
    fontFamily: colors.fontFamilyForText,
  },
  extraText: {
    marginBottom: 10,
    fontSize: 14,
    color: colors.headingColor,
    fontFamily: colors.fontFamilyForText,
  },
  extraTextContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'flex-start',
    margin: 10,
    fontSize: 14,
    color: 'white',
    fontFamily: colors.fontFamilyForText,
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
