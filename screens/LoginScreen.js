import { View, Text, KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.replace('Home Screen')
            }
        })

        return unsubscribe
    })

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('Registered in with', user.email)
            setDoc(doc(db, "users", user.uid), {
                transactions: []
              });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        })
    }
    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('Logged in with', user.email)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        })
    }

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <View style={styles.titleContainer}>
            <Text style={{fontSize: 36, fontWeight: '700', marginBottom: 5}}>Login</Text>
            <Text style={{fontSize: 16, color: '#999'}}>Please sign in to continue</Text>
        </View>
        <View style={styles.inputContainer}>
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
            {/* <TextInput 
            placeholder='Name'
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.input}
            /> */}
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity
            onPress={() => handleLogin()}
            style={styles.button}
            >
                <Text style={styles.buttonText}>LOGIN</Text>
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
            <Text style={styles.signupText}>Don't have an account?</Text>
            <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            >
                <Text style={[styles.signupText, styles.highlight]}>Sign up</Text>
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
