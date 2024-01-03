// SplashScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const SplashScreen = ({ navigation }) => { // Ajoutez navigation aux props
  return (
    <View style={styles.container}>
      <Image source={require('../assets/splash-image.png')} style={styles.backgroundImage} />
      <Image source={require('../assets/chapeau.png')} style={styles.logoImage} />
      <View style={styles.logoContainer}>
      <View style={styles.logoTextContainer}>
      <Text style={styles.orangeText}>Chef</Text>
      <Text style={styles.logoText}>Connect</Text>
      </View>
      <View style={styles.taglineContainer}>
          <Text style={styles.tagline}>Le chef, c'est vous !</Text><br></br>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SignIn')}
      >
        <Text style={styles.buttonText}>Se Connecter</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('SignUp')}
      >
        <View style={styles.signupText}>
      <View style={styles.logoTextContainer}>
      <Text style={styles.pdc}>Pas de compte ?</Text>
      <Text style={styles.signup}> Inscris toi !</Text>
      </View>
</View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    signupText: {
        color: 'orange',
        marginTop: 20,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    
    logoImage: {
      width: '25vw',  // 20% de la largeur de la fenêtre d'affichage
      height: '25vh', // 20% de la hauteur de la fenêtre d'affichage
   },
   
    
    logoContainer: {
      alignItems: 'center',
    },
    logoTextContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    orangeText: {
      color: 'orange',
      fontSize: 40,
      fontWeight: 'bold',
    },
    pdc: {
      color:"white",
      fontSize:"24",
    },
    signup: {
      color:"orange"
    },
    logoText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
    },
    taglineContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 10,
    },
    tagline: {
      color:"orange",
      textAlign: 'center',
      fontSize: 18,
      marginTop: 10,
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
    
});

export default SplashScreen;