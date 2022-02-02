import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase';


const images = {
  entertainment: require('../../../assets/icons/movie.png'),
  grocery: require('../../../assets/icons/shopping-cart.png'),
  investment: require('../../../assets/icons/budget.png'),
  clothes: require('../../../assets/icons/cloth.png'),
  health: require('../../../assets/icons/gym.png'),

}

export default function CategoryItems() {
    
    
  return (
    <View style={{
      marginHorizontal: 20,
      marginTop: 30,
    }}>
      <CategoryItem category='Entertainment' image={images.entertainment} />
      <CategoryItem category='Grocery' image={images.grocery}  />
      <CategoryItem category='Investment' image={images.investment} />
      <CategoryItem category='Clothes & Shoes'  image={images.clothes}/>
      <CategoryItem category='Health'  image={images.health}/>
    </View>

  );
}

const CategoryItem = (props) => {
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
  // const {transactions} = useSelector((state) => state.transactions);

  const categories = transactions.filter(transaction => transaction.category == props.category)
  // console.log(categories)
  const prices = categories.filter(categories => categories.price < 0)
  // console.log(prices)

  const total = prices.map(category => category.price).reduce((prev, curr) => (prev += curr), 0).toFixed(2) * -1;
  // console.log(total)
    
  return (
    <View style={styles.categoryItemWrapper}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <Image source={props.image} style={{width: 50, height: 50, marginRight: 15,}}/>
        <Text style={styles.categoryText}>{props.category}</Text>
      </View>
      <Text style={styles.categoryText}>${total}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  categoryItemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    paddingVertical: 15,
    alignItems: 'center',
    
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
});

