import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Button } from 'react-native';
import axios from 'axios';

const RecipeDetailScreen = ({ route }) => {
  const { recipeId } = route.params;
  const [recipeDetails, setRecipeDetails] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
        setRecipeDetails(response.data.meals[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  if (!recipeDetails) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView>
      <Image source={{ uri: recipeDetails.strMealThumb }} style={{ width: '100%', height: 300 }} />
      <Text>{recipeDetails.strMeal}</Text>
      {/* ... Affichez d'autres détails de la recette ici ... */}
    </ScrollView>
  );
};

export default RecipeDetailScreen;
