import { arrayRemove, arrayUnion, deleteDoc, deleteField, doc, FieldValue, getDoc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import AntDesign from 'react-native-vector-icons/AntDesign';
import { auth, db } from '../../firebase';

export default function ExpenseItem(props) {
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        getDoc(doc(db, "users", auth.currentUser.uid)).then(docSnap => {
            if (docSnap.exists()) {
            setTransactions(docSnap.data().transactions)
            } else {
            console.log("No such document!");
            }
      })
    }, [])

    // const handleDelete = async() => {
    //     updateDoc(doc(db, 'users', auth.currentUser.uid), {
    //         transactions: transactions.filter(transaction => transaction.id != props.id)
    //     })
    // }
    // console.log(props.transactions)
    // console.log(props.id)

    

    return (
        <View style={[styles.contentWrapper, styles.shadowProp]}>
            <View style={styles.leftWrapper}>
                {/* <AntDesign name="close" size={18}
                fillColor='lightgrey'
                onPress={() => {
                    
                }}
                style={{marginRight: 5, opacity: 0.4}}
                /> */}
                <View style={{marginLeft: 5,}}>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: 'bold'
                    }}>{props.title}</Text>
                    <Text style={{
                        fontSize: 13,
                        fontWeight: '600',
                        opacity: .5,
                    }}>{props.category}</Text>
                    <Text style={{
                        fontSize: 13,
                        fontWeight: '600',
                        opacity: .5,
                    }}>{props.currentDate}</Text>
                </View>
            </View>
            <View style={styles.rightWrapper}>
                <Text style={{
                    fontSize: 14,
                    fontWeight: '400',
                    color: props.price < 0 ? 'red' : 'green',
                }}>{props.price > 0 ? `+$${props.price}` : `-$${Math.abs(props.price)}`}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contentWrapper:{
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        padding: 15,
        borderBottomWidth: .5,
        borderBottomColor: '#cccccc',
        borderLeftWidth: .5,
        borderLeftColor: "#cccccc",
        borderRadius: 15,
    },
    leftWrapper:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightWrapper:{
        
    },
    
})