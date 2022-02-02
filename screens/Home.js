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
  const [upcomingAnime, setUpcomingAnime] = useState([]);
  const [topAnime, setTopAnime] = useState([]);
  const [summerAnime, setSummerAnime] = useState([]);
  const [springAnime, setSpringAnime] = useState([]);
  const [WinterAnime, setWinterAnime] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSeasonUpcomingAnime = async () => {
      try {
        const response = await getSeasonUpcomingAnime();
        const animeImages = [];
        response.forEach(res => {
          animeImages.push(`${res.images.webp.large_image_url}`);
        });
        setUpcomingAnime(response);
        setSliderImages(animeImages);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSeasonUpcomingAnime();
  }, []);

  useEffect(() => {
    const fetchTopAnime = async () => {
      try {
        const response = await getTopAnime();
        setTopAnime(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTopAnime();
  }, []);

  useEffect(() => {
    const fetchSeasonSummerAnime = async () => {
      try {
        const response = await getSeasonSummerAnime();
        setSummerAnime(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSeasonSummerAnime();
  }, []);

  useEffect(() => {
    const fetchSpringAnime = async () => {
      try {
        const response = await getSeasonSpringAnime();
        setSpringAnime(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSpringAnime();
  }, []);

  useEffect(() => {
    const fetchWinterAnime = async () => {
      try {
        const response = await getSeasonsWinterAnime();
        setWinterAnime(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchWinterAnime();
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
              onCurrentImagePressed={index =>
                navigation.navigate('Anime Details', {...upcomingAnime[index]})
              }
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
