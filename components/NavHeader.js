import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const NavHeader = ({home}) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1, marginRight: 20, paddingRight: 10}}>
      {home ? (
        <View style={styles.home}>
          <Image
            style={styles.logo}
            source={require('../assets/images/logo.png')}
          />
          <Icon
            name={'search-outline'}
            color={'#f58f84'}
            size={30}
            onPress={() => navigation.navigate('Search')}
          />
        </View>
      ) : (
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <Icon name={'chevron-back'} size={40} color={'white'} />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  home: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  logo: {
    width: 60,
    height: 60,
  },
});

export default NavHeader;
