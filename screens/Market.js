import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Coins from '../components/MarketComponents/Coins';

export default function Market() {

  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res => {
      setCoins(res.data)
    })
    .catch(error => 'Something went wrong.')
  }, [])

  const handleChange = (text) => {
    setSearch(text)
  }

  const filteredCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLocaleLowerCase()))
  
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <AntDesign name='search1' size={24} color={'#aaa'} />
        <TextInput placeholder='Search for Coins' onChangeText={(text) => handleChange(text)} style={styles.searchText} />
      </View>
      <ScrollView>
        {filteredCoins.map(coin => {
          return (
            <Coins key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            volume={coin.total_volume}
            />
          )
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    marginHorizontal: 20,
    marginBottom: 80
  },
  searchText: {
    marginLeft: 10,
  },
  searchBar: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
    backgroundColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 50,
  },
})
