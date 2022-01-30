import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import AntDesign from 'react-native-vector-icons/AntDesign';


export default function RegisterScreen({ navigation }) {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log('Registered in with', user.email)
        setDoc(doc(db, "users", user.uid), {
            firstName: firstName,
            lastName: lastName,
            transactions: []
          });
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    })
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <View style={styles.titleContainer}>
            <Text style={{fontSize: 35, fontWeight: '700'}}>Create Account</Text>
        </View>
        <View style={styles.inputContainer}>
            <TextInput 
            placeholder='First Name'
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            style={styles.input}
            />
            <TextInput 
            placeholder='Last Name'
            value={lastName}
            onChangeText={(text) => setLastName(text)}
            style={styles.input}
            />
            <TextInput 
            placeholder='Email'
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
            />
            <TextInput 
            placeholder='Password'
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            style={styles.input}
            />
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity
            onPress={() => handleSignUp()}
            style={styles.button}
            >
                <Text style={styles.buttonText}>SIGN UP</Text>
                <AntDesign name='arrowright' size={24} color={'white'}  style={{marginLeft: 5}}/>
            </TouchableOpacity>
            {/* <TouchableOpacity
            onPress={() => handleSignUp()}
            style={[styles.button, styles.buttonOutline]}
            >
                <Text style={styles.buttonOutlineText}>Register</Text>
            </TouchableOpacity> */}
            
        </View>
        <View style={styles.registerContainer}>
            <Text style={styles.signupText}>Already have an account?</Text>
            <TouchableOpacity
            onPress={() => navigation.replace('Login')}
            >
                <Text style={[styles.signupText, styles.highlight]}>Log In</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  titleContainer: {
      width: '80%',
      marginBottom: 40,
  },
  inputContainer: {
      width: '80%'
  },
  
  input: {
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
  },
  buttonContainer: {
      width: '35%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
  },
  button: {
      flexDirection: 'row',
      backgroundColor: '#FAAD3D',
      width: '100%',
      padding: 15,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center'
  },
  buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
  },
  buttonOutline: {
      backgroundColor: 'white',
      marginTop: 5,
      borderColor: '#FAAD3D',
      borderWidth: 2,
  },
  buttonOutlineText: {
      color: '#FAAD3D',
      fontWeight: '700',
      fontSize: 16,
  },
  registerContainer: {
      position: 'absolute',
      bottom: 40,
      flexDirection: 'row'
  },
  signupText: {
      fontSize: 14,
  },
  highlight: {
      marginLeft: 5,
      color: '#FAAD3D'
  },   
})