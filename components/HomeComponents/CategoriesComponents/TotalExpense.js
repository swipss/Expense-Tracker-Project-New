import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase';

export default function TotalExpense() {
    
    const [transactions, setTransactions] = useState([])
  const isFocused = useIsFocused();
   useEffect(() => {
       if (isFocused) {

           getDoc(doc(db, "users", auth.currentUser.uid)).then(docSnap => {
               if (docSnap.exists()) {
               setTransactions(docSnap.data().transactions)
               } else {
               console.log("No such document!");
               }
         })
       }
   }, [isFocused])

    const prices = transactions.map(transaction => transaction.price)

    const expense = prices.filter(price => price < 0).reduce((prev,curr) => (prev += curr), 0).toFixed(2) * -1

  return (
    <View style={{
        marginTop: 5,
        marginHorizontal: 20,
        borderTopColor: '#ccc',
        borderTopWidth: 1,
    }}>
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 5,
        }}>
            <Text style={{fontSize: 16,}}>Total expenses</Text>
            <Text style={{fontSize: 16, fontWeight:'700'}}>${expense}</Text>
        </View>
    </View>
  );
}
