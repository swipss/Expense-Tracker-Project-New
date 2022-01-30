import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import ExpenseItem from '../components/HomeComponents/ExpenseItem';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../components/HomeComponents/Card';
import NoTransactions from '../components/HomeComponents/NoTransactions';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useIsFocused } from "@react-navigation/native";


export default function Home({ navigation }) {
    // const {transactions} = useSelector((state) => state.transactions)

    const [transactions, setTransactions] = useState([])
    const [name, setName] = useState('')
    const [lastname, setLastName] = useState('')
    const isFocused = useIsFocused();
   useEffect(() => {
       if (isFocused) {

           getDoc(doc(db, "users", auth.currentUser.uid)).then(docSnap => {
               if (docSnap.exists()) {
               setTransactions(docSnap.data().transactions)
               setName(docSnap.data().firstName)
               setLast(docSnap.data().lastName)
               } else {
               console.log("No such document!");
               }
         })
       }
   }, [isFocused])

    // console.log(transactions, '❤')
    
      

    return (
        <View style={{
            flex: 1,
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginTop: 40,
            }}>
            <View style={{marginVertical: 10,}}>
                <Text style={{fontSize: 35, fontWeight: '300'}}>Hello,</Text>
                <Text style={{fontSize: 35, fontWeight: '600',}}>{name}</Text>
            </View>
            <Card navigation={navigation} data={transactions} />
            
            <View style={{flex: 1, justifyContent: 'center'}}>
                {
                    transactions.length > 0 ? (
                        <FlatList data={transactions}
                        renderItem={({item}) => (
                            <ExpenseItem title={item.title} price={item.price} id={item.id} category={item.category}/>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        />

                    ) : <NoTransactions />
                }
                {/* <AddTransactionButton navigation={navigation}/> */}
            </View>
            <View style={{height: 90}}/>
            {/* <AddTransactionModal /> */}
            {/* <BottomTabs navigation={navigation}/> */}
        </View>

    )
}

const styles = StyleSheet.create({
    box: {
        width: '100%',
        height: 190,
        borderRadius: 15,
        flexDirection: 'row',
        padding: 22,
    },
})
