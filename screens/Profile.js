import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';

export default function Profile({ navigation }) {
  
  const [data, setData] = useState([])

   useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then(docSnap => {
        if (docSnap.exists()) {
          setData(docSnap.data())
        } else {
          console.log("No such document!");
        }
      })
   }, [])

  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
      navigation.replace('Login');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
  })
  }

  return (
    <View style={{flex: 1}}>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: '20%',
        borderBottomColor: '#ccc',
        borderBottomWidth: .5,
        marginTop: 20,
      }}>
        <Image source={require('../assets/icons/boss.png')} style={{width:100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: '#FAAD3D',}} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.titleContainer}>FIRST NAME</Text>
        <Text style={styles.infoText}>{data.firstName}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.titleContainer}>LAST NAME</Text>
        <Text style={styles.infoText}>{data.lastName}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.titleContainer}>EMAIL</Text>
        <Text style={styles.infoText}>{auth.currentUser?.email}</Text>
      </View>
      <TouchableOpacity
      onPress={() => handleSignOut()}
      style={styles.button}
      >
        <Text style={{
          color: '#fff',
          fontSize: 16,
          fontWeight: '700',
        }}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  titleContainer: {
    color: '#999',
  },
  infoText: {
    marginTop: 5,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FAAD3D',
    marginHorizontal: 20,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,

  },
})
