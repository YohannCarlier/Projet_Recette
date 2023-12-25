// SplashScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const SplashScreen = ({ navigation }) => { // Ajoutez navigation aux props
  return (
    <View style={styles.container}>
      <Image source={require('../assets/splash-image.png')} style={styles.backgroundImage} />
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>ChefConnect</Text>
        <Text style={styles.tagline}>Le chef, c'est vous !</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SignIn')} // Ajoutez cette ligne pour naviguer vers Sign In
      >
        <Text style={styles.buttonText}>Se Connecter</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('SignUp')} // Ajoutez cette ligne pour naviguer vers Sign Up
      >
        <Text style={styles.signupText} >Pas de compte ? Inscris toi !</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    // ... vos styles existants
    signupText: {
        color: 'blue',
        marginTop: 20,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    logoContainer: {
        marginBottom: 100,
    },
    logoText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
    },
    tagline: {
        fontSize: 20,
        color: 'white',
    },
    button: {
        backgroundColor: 'orange',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    signupText: {
        color: 'blue',
    },
    
});

export default SplashScreen;
