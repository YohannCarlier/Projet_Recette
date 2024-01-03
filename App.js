import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './screens/TabNavigator'; 

import SplashScreen from './screens/SplashScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import RecipeListScreen from './screens/home';
import RecipeDetail from './screens/RecipeDetailScreen';

// Initialize the stack navigator
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
        {/* L'écran principal contient maintenant le BottomTabNavigator */}
        <Stack.Screen
          name="Main"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
        name="RecipeList" 
        component={RecipeListScreen} 
        />
        <Stack.Screen 
        name="RecipeDetail" 
        component={RecipeDetail} 
        options={{ title: 'Detail recette' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
