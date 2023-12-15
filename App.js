// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/home';
// import firebase from '@react-native-firebase/app';
// import auth from '@react-native-firebase/auth';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ title: 'Connexion' }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ title: 'Inscription' }}
        />
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{ title: 'home' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
