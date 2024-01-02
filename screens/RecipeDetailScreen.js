import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const RecipeDetailScreen = ({ route, navigation }) => {
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
    return <Text style={styles.loading}>Chargement...</Text>;
  }

  // Extrait les ingrédients et les mesures dans un tableau d'objets
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipeDetails[`strIngredient${i}`];
    const measure = recipeDetails[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push({ name: ingredient, measure });
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{recipeDetails.strMeal}</Text>
      <Image source={{ uri: recipeDetails.strMealThumb }} style={styles.image} />
      
      <View style={styles.section}>
        <Text style={styles.header}>Ingrédients</Text>
        {ingredients.map((item, index) => (
          <View key={index} style={styles.ingredient}>
            <Text style={styles.ingredientText}>{item.name}: {item.measure}</Text>
          </View>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>Procédure</Text>
        <Text style={styles.procedure}>{recipeDetails.strInstructions}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
  },
  backButton: {
    padding: 20,
    fontSize: 18,
  },
  image: {
    width: '100%',
    height: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#FFA500',
  },
  section: {
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ingredient: {
    fontSize: 16,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  ingredientText: {
    fontSize: 16,
  },
  procedure: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
});

export default RecipeDetailScreen;
