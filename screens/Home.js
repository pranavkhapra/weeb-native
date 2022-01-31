import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  getSeasonSpringAnime,
  getSeasonSummerAnime,
  getSeasonUpcomingAnime,
  getTopAnime,
  getSeasonsWinterAnime,
} from '../api/axios';
import {SliderBox} from 'react-native-image-slider-box';
import MovieCarousel from '../components/MovieCarousel';
const dimension = Dimensions.get('screen');
const Home = ({navigation}) => {
  const [sliderImages, setSliderImages] = useState([]);
  const [topAnime, setTopAnime] = useState([]);
  const [summerAnime, setSummerAnime] = useState([]);
  const [springAnime, setSpringAnime] = useState([]);
  const [WinterAnime, setWinterAnime] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        const response1 = await getTopAnime();
        const response2 = await getSeasonSummerAnime();
        const response3 = await getSeasonSpringAnime();
        const response4 = await getSeasonsWinterAnime();
        const response5 = await getSeasonUpcomingAnime();
        const animeImages = [];
        response5.forEach(res => {
          animeImages.push(`${res.images.webp.large_image_url}`);
        });
        setSliderImages(animeImages);
        setWinterAnime(response4);
        setSpringAnime(response3);
        setSummerAnime(response2);
        setTopAnime(response1);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAnimeDetails();
  }, []);

  return (
    <>
      {!loading ? (
        <ScrollView style={styles.container}>
          <View style={styles.sliderContainer}>
            <SliderBox
              images={sliderImages}
              sliderBoxHeight={dimension.height / 2}
              autoplay={true}
              circleLoop={true}
              dotStyle={styles.sliderStyle}
            />
          </View>
          <View style={styles.carousel}>
            <MovieCarousel
              title="Top Anime"
              items={topAnime}
              navigation={navigation}
            />
          </View>
          <View style={styles.carousel}>
            <MovieCarousel
              title="Summer Anime"
              items={summerAnime}
              navigation={navigation}
            />
          </View>
          <View style={styles.carousel}>
            <MovieCarousel
              title="Spring Anime"
              items={springAnime}
              navigation={navigation}
            />
          </View>
          <View style={styles.carousel}>
            <MovieCarousel
              title="Winter Anime"
              items={WinterAnime}
              navigation={navigation}
            />
          </View>
        </ScrollView>
      ) : (
        <View style={styles.loading}>
          <ActivityIndicator size="large" style={styles.loading} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#875f9a',
  },
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderStyle: {
    height: 0,
  },
  carousel: {},
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '1',
  },
});
export default Home;
