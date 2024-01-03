import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';

const ProfileScreen = ({ navigation }) => {
  const auth = getAuth();
  const user = auth.currentUser; // Récupère l'utilisateur actuel

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.navigate('SignIn'); // Assurez-vous que 'SignIn' est le nom de votre écran de connexion
    } catch (error) {
      Alert.alert('Erreur', "Problème lors de la déconnexion.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Paramètres</Text>
      {user && (
        <View>
          
          <Text style={styles.userInfo}>E-mail: {user.email}</Text>
        </View>
      )}
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutButtonText}>Déconnexion</Text>
      </TouchableOpacity>
    </View>
  );
};

// Définissez votre style ici
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7', // couleur de fond de l'écran
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userInfo: {
    fontSize: 18,
    marginVertical: 4, // espace vertical entre le nom et l'email
  },
  signOutButton: {
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'orange',
    borderRadius: 20, // arrondir les coins du bouton
  },
  signOutButtonText: {
    color: '#FFF',
    fontSize: 18,
  },
});

export default ProfileScreen;
