import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity, ScrollView, Platform } from 'react-native';
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
    const isFocused = useIsFocused();
   useEffect(() => {
       if (isFocused) {

           getDoc(doc(db, "users", auth.currentUser.uid)).then(docSnap => {
               if (docSnap.exists()) {
               setTransactions(docSnap.data().transactions)
               setName(docSnap.data().firstName)
               } else {
               console.log("No such document!");
               }
         })
       }
   }, [isFocused])
    // console.log(transactions)
    // useEffect(() => {
    //     getData()
    // }, [])
    // const getData = async() => {
    //     getDoc(doc(db, 'users', auth.currentUser.uid)).then(docSnap => {
    //         if(docSnap.exists()) {
    //             setTransactions(docSnap.data().transactions)
    //             setName(docSnap.data().firstName)
    //             console.log(transactions)
    //         } else {
    //             console.log("No such document.")
    //         }
    //     })
        
    // }
    
    
      
    return (
        <View style={{
            flex: 1,
            backgroundColor: Platform.OS === 'android' ? '#FAAD3D' : '#facb3d'
            }}>
            {/* <View style={{marginTop: 40,}}>
                <Text style={{fontSize: 35, fontWeight: '300'}}>Hello,</Text>
                <Text style={{fontSize: 35, fontWeight: '600',}}>{name}</Text>
            </View> */}
            <Card navigation={navigation} data={transactions} name={name} />
            
            
            <ScrollView style={{backgroundColor: '#fff', borderTopLeftRadius: 50, borderTopRightRadius: 50, flex: 1}}>
                {
                    transactions.length > 0 ? (
                        <FlatList data={transactions}
                        renderItem={({item}) => (
                            <ExpenseItem transactions={transactions} title={item.title} price={item.price} id={item.id} category={item.category} currentDate={item.date}/>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                            showsVerticalScrollIndicator={false}
                            inverted
                            
                            />
                            
                            ) : <NoTransactions />
                        }
                {/* <AddTransactionButton navigation={navigation}/> */}
            </ScrollView>
            <View style={{height: 100, backgroundColor: '#fff'}}/>
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
