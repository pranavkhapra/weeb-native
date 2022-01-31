import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {searchAnimeByName} from '../api/axios';
import MovieCard from '../components/MovieCard';
import {useNavigation} from '@react-navigation/native';
const dimensions = Dimensions.get('screen').width;

const SearchBox = () => {
  const [text, setText] = useState();
  const [data, setData] = useState();
  const navigation = useNavigation();

  const handleSearch = async () => {
    try {
      const response = await searchAnimeByName(text);
      setData(response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SafeAreaView style={{backgroundColor: '#5d3f6a', flex: 1}}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setText}
            value={text}
            placeholder={'Search Anime Shows or Movies'}
            placeholderTextColor={'white'}
          />
        </View>
        <TouchableOpacity onPress={handleSearch}>
          <Icon name={'search-outline'} color={'black'} size={30} />
        </TouchableOpacity>
      </View>
      <View style={styles.searchItems}>
        {/* Searched items results */}
        {data && data.length > 0 && (
          <FlatList
            contentContainerStyle={{
              alignSelf: 'center',
              paddingBottom: 200,
            }}
            numColumns={2}
            data={data}
            renderItem={({item}) => (
              <MovieCard navigation={navigation} {...item} />
            )}
            keyExtractor={item => item.mal_id}
          />
        )}

        {/* When searched but no results */}
        {data && data.length == 0 && (
          <View style={styles.noResults}>
            <Text>No results matching your criteria.</Text>
            <Text>Try different keywords.</Text>
          </View>
        )}

        {/* When nothing is searched */}
        {!data && (
          <View style={styles.noResults}>
            <Text>Come on Don't be shy Type Something</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchContainer: {
    flexBasis: 'auto',
    flexGrow: 1,
  },
  input: {
    borderRadius: 10,
    borderWidth: 0.5,
    margin: 10,
    padding: 8,
  },
  searchItems: {
    padding: 5,
  },
  noResults: {
    padding: 20,
    color: 'white',
  },
});
export default SearchBox;
