import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RecipeListScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      setRecipes(response.data.meals);
    } catch (error) {
      console.log(error);
    }
  };
  const TopBar = () => (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.text}>Nouvelles Recettes</Text>
      {/* Add additional icons or buttons as needed */}
    </View>
  );

  const renderRecipe = ({ item }) => (


    <View style={styles.card}>
    <TouchableOpacity onPress={() => {
      //console.log('Recipe ID: ', item.idMeal);
      navigation.navigate('RecipeDetail', { recipeId: item.idMeal });
    }}>
      <Image source={{ uri: item.strMealThumb }} style={styles.image} />
      <Text style={styles.title}>{item.strMeal}</Text>
    </TouchableOpacity>
    <TouchableOpacity 
      style={styles.favoriteIcon}
      onPress={() => {/* Ajoutez ici la logique pour gérer l'ajout aux favoris */}}
    >
      <Icon name="favorite-border" size={24} color="#FFF" />
    </TouchableOpacity>
  </View>
);

  return (
    <View style={{ flex: 1 }}>
    <TopBar />
    <FlatList
      data={recipes}
      renderItem={renderRecipe}
      keyExtractor={item => item.idMeal}
      numColumns={2} // Display grid
      columnWrapperStyle={styles.row}
    />
     </View>
  );
};

const styles = StyleSheet.create({
    row: {
        flex: 1,
        justifyContent: "space-around", // This ensures even spacing of the columns
      },
      card: {
        flex: 1,
        borderRadius: 10,
        margin: 10,
        overflow: 'hidden', // This ensures that the image doesn't bleed outside the border radius
        elevation: 3, // This adds a subtle shadow on Android
        backgroundColor: '#FFF',
      },
      image: {
        width: '100%',
        height: 150, // Fixed height for uniformity
      },
      title: {
        padding: 5,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      favoriteIcon: {
        position: 'absolute', // This places the icon over the image
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        padding: 5,
        borderRadius: 50, // Circular background
      },
      container: {
        height: 60, // Set the height you want for your top bar
        backgroundColor: '#000', // Or any color you want
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight, // For Android to ensure the content doesn't go behind the status bar
      },
      text: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
      },
});

export default RecipeListScreen;