import { View, Text, KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

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
                name: name,
                transactions: [
                    {id: 1, title: 'Soup', price: -20, category: 'Grocery', type: 'expense'},
                    {id: 2, title: 'Aids', price: -30, category: 'Health', type: 'expense'},
                ]
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
            <TextInput 
            placeholder='Name'
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.input}
            />
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity
            onPress={() => handleLogin()}
            style={styles.button}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => handleSignUp()}
            style={[styles.button, styles.buttonOutline]}
            >
                <Text style={styles.buttonOutlineText}>Register</Text>
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
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#FAAD3D',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
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
})
