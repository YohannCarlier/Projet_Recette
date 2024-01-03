import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getAuth } from 'firebase/auth';
import { doc, setDoc, getFirestore } from 'firebase/firestore';

const RecipeListScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const auth = getAuth();
  const firestore = getFirestore();

  useEffect(() => {
    if (query.length > 0) {
      // Déclencher la recherche lorsque la requête change et n'est pas vide
      fetchRecipes(query);
    } else {
      // Gérer éventuellement le cas où la requête est effacée
      setRecipes([]);
    }
  }, [query]);

  const fetchRecipes = async (searchQuery) => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`);
      setRecipes(response.data.meals || []);
    } catch (error) {
      console.log(error);
    }
  };

  const TopBar = () => (
    <View style={styles.searchContainer}>
      <StatusBar barStyle="light-content" />
      <TextInput
        style={styles.searchInput}
        placeholder="Recherche une recette ..."
        placeholderTextColor="#666"
        value={query}
        onChangeText={(text) => setQuery(text)}
        autoCorrect={false}
        clearButtonMode="while-editing"
        autoFocus
      />
    </View>
  );

  const addToFavorites = async (recipe) => {
    if (auth.currentUser) {
      // Créer un document dans la sous-collection 'favorites' de l'utilisateur
      const favDocRef = doc(firestore, `users/${auth.currentUser.uid}/favorites`, recipe.idMeal);
      try {
        await setDoc(favDocRef, recipe); 
        alert('Recette ajoutée aux favoris !');
      } catch (error) {
        console.error('Erreur d\'ajout aux favoris :', error);
        alert('Erreur lors de l\'ajout aux favoris.');
      }
    } else {
      alert('Veuillez vous connecter pour ajouter des favoris.');
    }
  };


  const renderRecipe = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => {
      //console.log('Recipe ID: ', item.idMeal);
      navigation.navigate('RecipeDetail', { recipeId: item.idMeal });
    }}>
      <Image source={{ uri: item.strMealThumb }} style={styles.image} />
      <Text style={styles.title}>{item.strMeal}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.favoriteIcon} onPress={() => addToFavorites(item)}>
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
        keyExtractor={(item) => item.idMeal}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
  card: {
    flex: 1,
    borderRadius: 10,
    margin: 10,
    overflow: 'hidden',
    elevation: 3,
    backgroundColor: '#FFF',
  },
  image: {
    width: '100%',
    height: 150,
  },
  title: {
    padding: 5,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    borderRadius: 50,
  },
  searchContainer: {
    height: 60,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  searchInput: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RecipeListScreen;