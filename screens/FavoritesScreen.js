import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, getFirestore, query, where, deleteDoc, doc } from 'firebase/firestore';

const FavoritesScreen =  ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const auth = getAuth();
  const firestore = getFirestore();
  
  useEffect(() => {
    // Cette fonction est appelée chaque fois que l'écran gagne le focus
    const unsubscribe = navigation.addListener('focus', () => {
      fetchFavorites();
    });
  
    // Appel initial pour charger les favoris
    fetchFavorites();
  
    // Retournez la fonction de nettoyage pour vous désinscrire de l'écouteur
    return unsubscribe;
  }, [navigation]);

  const fetchFavorites = async () => {
    if (auth.currentUser) {
      const q = query(collection(firestore, `users/${auth.currentUser.uid}/favorites`));
      try {
        const querySnapshot = await getDocs(q);
        const favs = [];
        querySnapshot.forEach((doc) => {
          favs.push({ ...doc.data(), docId: doc.id }); // Also store the document ID
        });
        setFavorites(favs);
      } catch (error) {
        console.error('Erreur lors de la récupération des favoris:', error);
      }
    } else {
      alert('Veuillez vous connecter pour voir vos favoris.');
    }
  };

  const removeFromFavorites = async (recipeId, docId) => {
    if (auth.currentUser) {
      const favDocRef = doc(firestore, `users/${auth.currentUser.uid}/favorites`, recipeId);
      try {
        await deleteDoc(favDocRef);
        alert('Recette retirée des favoris !');
        // Refetch the updated favorites list
        fetchFavorites();
      } catch (error) {
        console.error('Erreur lors du retrait des favoris :', error);
        alert('Erreur lors du retrait des favoris.');
      }
    }
  };

  const renderFavoriteItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => {
        navigation.navigate('RecipeDetail', { recipeId: item.idMeal });
      }}>
        <Image source={{ uri: item.strMealThumb }} style={styles.image} />
        <Text style={styles.title}>{item.strMeal}</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.removeIcon}
        onPress={() => removeFromFavorites(item.idMeal, item.docId)}
      >
        <Text style={styles.removeText}>Retirer des favoris</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.header}>Vos Favoris</Text>
      {favorites.length === 0 ? (
        <Text style={styles.noFavoritesText}>Aucun favori ajouté</Text>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderFavoriteItem}
          keyExtractor={(item) => item.idMeal}
          numColumns={2}
          columnWrapperStyle={styles.row}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
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
  removeIcon: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  removeText: {
    color: '#FFF',
    textAlign: 'center',
  },
  noFavoritesText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default FavoritesScreen;