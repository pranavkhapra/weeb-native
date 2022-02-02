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
import {colors} from '../themes/Color';
const dimension = Dimensions.get('screen');
const Home = ({navigation}) => {
  const [sliderImages, setSliderImages] = useState([]);
  const [upcomingAnime, setUpcomingAnime] = useState([]);
  const [topAnime, setTopAnime] = useState([]);
  const [summerAnime, setSummerAnime] = useState([]);
  const [springAnime, setSpringAnime] = useState([]);
  const [WinterAnime, setWinterAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getData = () => {
    return Promise.all([
      getSeasonUpcomingAnime(),
      getTopAnime(),
      getSeasonSummerAnime(),
      getSeasonSpringAnime(),
      getSeasonsWinterAnime(),
    ]);
  };

  useEffect(() => {
    getData()
      .then(
        ([
          upcominganime,
          topanime,
          seasonsummeranime,
          seasonspringanime,
          seasonwinteranime,
        ]) => {
          const animeImages = [];
          upcominganime.forEach(res => {
            animeImages.push(`${res.images.webp.large_image_url}`);
          });
          setUpcomingAnime(upcominganime);
          setSliderImages(animeImages);
          setTopAnime(topanime);
          setSummerAnime(seasonsummeranime);
          setSpringAnime(seasonspringanime);
          setWinterAnime(seasonwinteranime);
        },
      )
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
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
              resizeMode={'cover'}
              dotStyle={styles.sliderStyle}
              onCurrentImagePressed={index =>
                navigation.navigate('Anime Details', {...upcomingAnime[index]})
              }
              imageLoadingColor={'#f58f84'}
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
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.backgroundColor,
          }}>
          <ActivityIndicator size={'large'} color={colors.headingColor} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundColor,
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
});
export default Home;
