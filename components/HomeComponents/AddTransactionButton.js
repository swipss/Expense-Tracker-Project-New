import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'



export default function AddTransactionButton({ navigation }) {
  return (
    <TouchableOpacity style={{
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: '#F1CB0C',
        padding: 20,
        borderRadius: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }}
    onPress={() => navigation.navigate("AddTransaction")}
    >
        <Entypo name="plus" size={28} color={'white'} />
    </TouchableOpacity>
  );
}
