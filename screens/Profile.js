import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

export default function Market() {
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
        <Text style={styles.infoText}>Sten</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.titleContainer}>LAST NAME</Text>
        <Text style={styles.infoText}>Vassiljev</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.titleContainer}>EMAIL</Text>
        <Text style={styles.infoText}>stenvassiljev@gmail.com</Text>
      </View>
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
  
})
