import React from 'react'
import { View, Text } from 'react-native'

export default function NoTransactions() {
    return (
        <View style={{alignItems: 'center',}}>
            <Text style={{color: '#cccccc', fontSize: 18,}}>
                No transactions made yet
            </Text>
        </View>
    )
}
