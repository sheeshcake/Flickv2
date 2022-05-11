import React from 'react';
import {Home, StartSetup, PlayerPageTest, Splash, MovieDetail} from './screens';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {COLORS} from './constants'
import Tabs from './navigation/Tabs';

const Stack = createStackNavigator();

const App = () => {


  return (
    <SafeAreaView
        style={{
            flex: 1,
            backgroundColor: COLORS.black
        }}
    >
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
          initialRouteName={'Tabs'}
        >
          <Stack.Screen
            name="Tabs"
            component={Tabs}
          />
          <Stack.Screen
            name="Splash"
            component={Splash}
          />
          <Stack.Screen
            name="StartSetup"
            component={StartSetup}
          />
          <Stack.Screen
            name="MovieDetail"
            component={MovieDetail}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default App;