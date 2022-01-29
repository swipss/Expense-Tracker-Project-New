import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function BottomTabs({ navigation }) {
    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10, backgroundColor: 'skyblue'}}>
            <TouchableOpacity onPress={() => navigation.navigate("Categories")}>
                <MaterialIcons name="category" size={30} />
            </TouchableOpacity>
        </View>
    )
}
