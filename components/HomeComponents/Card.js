import React, {useState, useEffect} from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'
import { getDoc, doc } from 'firebase/firestore'
import { auth, db } from '../../firebase'
import { useIsFocused } from '@react-navigation/native'

export default function Card({navigation, ...props}) {

    // const {transactions} = useSelector((state) => state.transactions);
    const isFocused = useIsFocused()
    const [data, setData] = useState([])
    

    useEffect(() => {
        if (isFocused) {

            getDoc(doc(db, "users", auth.currentUser.uid)).then(docSnap => {
            if (docSnap.exists()) {
              setData(docSnap.data().transactions)
            } else {
              console.log("No such document!");
            }
          })
        }
   }, [isFocused])
//    console.log('🤞', data)
    
//   console.log(transactions)
   

    const prices = data.map(transaction => transaction.price);
    // console.log(prices)
    const totalPrice = prices.reduce((prev, curr) => (prev += curr), 0).toFixed(2)

    // const expense = prices.filter(price => price < 0).reduce((prev, curr) => (prev += curr), 0).toFixed(2) * -1;

    return (
        <LinearGradient colors={['#fad73d', '#facb3d', '#FAAD3D']} style={styles.box}>
                <View style={{
                    alignItems: 'center',
                    marginTop: 25,
                }}>
                    <Text style={{
                        fontSize: 18,
                        color: '#fff',
                        fontWeight: 'bold',
                    }}>Hello, {props.name}</Text>
                    
                    <Text style={{
                        fontSize: 38,
                        color: '#fff',
                        fontWeight: 'bold',
                        marginTop: 20,
                    }}>{totalPrice < 0 ? `-$${Math.abs(totalPrice)}` : `$${totalPrice}`}</Text>
                    {/* <Text style={{
                        marginTop: 67,
                        color: '#fff',
                        fontSize: 18,
                        fontWeight: '700'
                    }}> 5167 **** **** 2014</Text> */}
                </View>
                <View style={{flex: 1, alignItems: 'flex-end',}}>
                <Text style={{
                        fontSize: 17,
                        color: '#fff',
                        fontWeight: 'bold',
                        marginTop: 7,
                    }}>Current Balance</Text>
                    
                    {/* <TouchableOpacity onPress={() => navigation.navigate("AddTransaction")} style={{
                        padding: 10,
                        marginTop: 32,
                        borderWidth: 3,
                        borderColor: '#FFF',
                        borderRadius: 30,
                        backgroundColor: '#e10c62',
                        alignItems: 'center',
                        justifyContent: 'center',

                    }}>
                        <Text style={{
                            color: '#fff',
                            fontWeight: '700',
                        }}>ADD</Text>
                    </TouchableOpacity> */}
                    {/* <View style={{marginTop: 80,}}>
                        <Text style={{
                            color: '#fff',
                            marginTop: 17,
                            fontWeight: '700',
                            fontSize: 11,
                        }}>Expenses</Text>
                        <Text style={{
                            color: '#fff',
                            fontWeight: '700',
                            fontSize: 15,
                            textAlign: 'right',
                        }}>${expense}</Text>

                    </View> */}
                </View>
            </LinearGradient>
    )
}

const styles = StyleSheet.create({
    box: {
        height: 190,
        padding: 22,
        marginBottom: 10,
        alignItems: 'center',
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
})
