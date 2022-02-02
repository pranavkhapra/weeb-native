import React, {useEffect} from 'react';
import Home from './screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Anime from './screens/Anime';
import NavHeader from './components/NavHeader';
import SearchBox from './screens/SearchBox';
import SplashScreen from 'react-native-splash-screen';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTransparent: true,
            headerTitle: () => <NavHeader home={true} />,
          }}
        />
        <Stack.Screen
          name="Anime Details"
          component={Anime}
          options={{
            headerTransparent: true,
            headerBackTitleVisible: false,
            headerBackVisible: false,
            headerTitle: () => <NavHeader home={false} />,
          }}
        />
        <Stack.Screen
          name="Search"
          component={SearchBox}
          options={{
            headerTransparent: true,
            headerBackTitleVisible: false,
            headerBackVisible: false,
            headerTitle: () => <NavHeader home={false} />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
