import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_APP } from '../firebase';

function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const signUp = async () => {
    const auth = getAuth(FIREBASE_APP);

    if (password !== confirm_password) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Inscription réussie, veuillez vous connecter !');
      navigation.navigate('SignIn');
    } catch (error) {
      console.error(error);
      alert('Erreur lors de l\'inscription : ' + error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>Page d'Inscription</Text>
      <TextInput
        value={name}
        style={styles.input}
        placeholder='Nom'
        autoCapitalize='none'
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        value={email}
        style={styles.input}
        placeholder='Adresse email'
        autoCapitalize='none'
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        secureTextEntry={true}
        value={password}
        style={styles.input}
        placeholder='Mot de passe'
        autoCapitalize='none'
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        secureTextEntry={true}
        value={confirm_password}
        style={styles.input}
        placeholder='Confirmer votre mot de passe'
        autoCapitalize='none'
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <Button title="S'inscrire" onPress={signUp} color="#FFA500"/><br></br>
      <Button title="Déjà un compte ? Connexion" onPress={() => navigation.navigate('SignIn')} color="#FFA500"/>
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#f4f4f4', // Adjust background color as needed
    },
    title: {
      fontSize: 24,
      color: '#333',
      marginBottom: 20,
    },
    logoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFA500',
    },
    input: {
      width: '90%', // Adjust width as needed
      marginVertical: 10,
      padding: 15,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      fontSize: 16,
      backgroundColor: '#fff', // Assuming you want a white background for the input
    },
    buttonPrimary: {
      width: '90%',
      padding: 15,
      marginTop: 10,
      borderRadius: 5,
      backgroundColor: '#FFA500', // Adjust button color as needed
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonSecondary: {
      width: '90%',
      padding: 15,
      marginTop: 10,
      borderRadius: 5,
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textCenter: {
      color: '#fff', // for primary button
      fontSize: 16,
    }
});

export default SignUpScreen;