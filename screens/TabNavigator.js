import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './home';
import FavoritesScreen from './FavoritesScreen'; 
import SearchScreen from './Rechercher';
import ProfileScreen from './ProfileScreen'; 

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'ios-heart' : 'ios-heart-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'ios-search' : 'ios-search-outline';
          } else if (route.name === 'settings') {
            iconName = focused ? 'ios-settings' : 'ios-settings-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: 'white' },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="settings" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
