import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import ExpenseItem from '../components/HomeComponents/ExpenseItem';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../components/HomeComponents/Card';
import NoTransactions from '../components/HomeComponents/NoTransactions';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';


export default function Home({ navigation }) {
    const {transactions} = useSelector((state) => state.transactions)

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

    console.log(data)
    
      

    return (
        <View style={{
            flex: 1,
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginTop: 40,
            }}>
            <View style={{marginVertical: 10,}}>
                <Text style={{fontSize: 35, fontWeight: '300'}}>Hello,</Text>
                <Text style={{fontSize: 35, fontWeight: '600',}}>{data.name}</Text>
            </View>
            <Card navigation={navigation} />
            
            <View style={{flex: 1, justifyContent: 'center'}}>
                {
                    transactions.length > 0 ? (
                        <FlatList data={data.transactions}
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
