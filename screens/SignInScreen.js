import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_APP } from '../firebase';


function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    const auth = getAuth(FIREBASE_APP);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Connexion réussie !');
      // Naviguez vers votre écran d'accueil ou toute autre page nécessaire
      // navigation.navigate('Home');
    } catch (error) {
      console.error(error);
      alert('Erreur de connexion : ' + error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>Page de Connexion</Text>
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
      <Button title="Se connecter" onPress={() => navigation.navigate('home')} color="#FFA500" />
       
      <Button title="Pas encore de compte ? Inscription" onPress={() => navigation.navigate('SignUp')} color="#FFA500"/>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    color: 'white',
    fontSize: 16,
  },
  buttonSecondary: {
    width: '90%',
    padding: 15,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: 'transparent',
    color: '#555',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  textCenter: {
    textAlign: 'center',
  },
});



export default SignInScreen;
