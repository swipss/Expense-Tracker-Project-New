import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Touchable, KeyboardAvoidingView, Keyboard, ScrollView, Image, FlatList } from 'react-native';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import {addTransaction} from '../../redux/store/actions/transactionAction';
import { Picker } from '@react-native-picker/picker'
import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import AntDesign from 'react-native-vector-icons/AntDesign'

const items = [
    {
        image: require('../../assets/icons/movie.png'),
        text: 'Entertainment'
    },
    {
        image: require('../../assets/icons/shopping-cart.png'),
        text: 'Grocery'
    },
    {
        image: require('../../assets/icons/budget.png'),
        text: 'Investment'
    },
    {
        image: require('../../assets/icons/cloth.png'),
        text: 'Clothes & Shoes'
    },
    {
        image: require('../../assets/icons/gym.png'),
        text: 'Health'
    },
    
];

export default function AddTransaction({navigation, modalVisible, setModalVisible}) {
    // console.log(selectedValue, category);
    
    
    const dispatch = useDispatch();
    const [selectedValue, setSelectedValue] = useState('expense');
    const [category, setCategory] = useState('Entertainment');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    // console.log(selectedValue)
    // console.log(category)
    // console.log(price)

    const [currentDate, setCurrentDate] = useState('')

    useEffect(() => {
        var date = new Date().getDate() // current date
        var month = new Date().getMonth() + 1 // current month
        var year = new Date().getFullYear() // current year
        setCurrentDate(
            date + '.' + month + '.' + year
        )
    }, [])
    
    

    const onSubmit = () => {
        if (!title || !price) {
            return alert('Please fill out all the fields')
        }

        const id = Math.floor(Math.random() * 600000);

        updateDoc(doc(db, 'users', auth.currentUser.uid), {
            transactions: arrayUnion({
                category: category,
                id: id,
                price: +price,
                title: title,
                type: selectedValue,
                date: currentDate 
            })
        })
        // const newTransaction = {
        //     id,
        //     title,
        //     category,
        //     price: +price,
        //     type: selectedValue,
        // }

        // dispatch(addTransaction({...newTransaction}));

        navigation.navigate('Home Screen')        
        

        
    };

    return (
        
        <View style={styles.container}>
            
            
            <AntDesign name="left" size={25} onPress={() => navigation.goBack()}/>
            <View style={{flexDirection: 'row', alignSelf: 'center', marginHorizontal: 40, marginTop: 10,}}>
                
                <TouchableOpacity onPress={() => setSelectedValue('expense')} style={{
                    backgroundColor: selectedValue == 'expense' ? '#FAAD3D' : '#fff',
                    paddingVertical: 14,
                    paddingHorizontal: 60,
                    borderRadius: 10,
                }}>
                    <Text style={{
                        color: selectedValue == 'expense' ? '#fff' : 'black',
                        fontSize: 16,
                        fontWeight: 'bold'
                    }}>Expense</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => setSelectedValue('income')} style={{
                    backgroundColor: selectedValue == 'income' ? '#FAAD3D' : '#fff',
                    paddingVertical: 14,
                    paddingHorizontal: 60,
                    borderRadius: 10,
                    marginLeft: 5,
                }}>
                    <Text style={{
                        color: selectedValue == 'income' ? '#fff' : 'black',
                        fontSize: 16,
                        fontWeight: 'bold'
                    }}>Income</Text>
                </TouchableOpacity>
                
            </View>
            <View style={{marginTop: 10, backgroundColor: 'white', paddingVertical: 10, paddingLeft: 20, borderRadius: 10,}}>
                <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={items}
                renderItem={({item}) => (<TouchableOpacity onPress={() => setCategory(item.text)} style={{ alignItems: 'center', marginRight: 30,
                backgroundColor: category == item.text ? '#FAAD3D' : '#fff',
                borderRadius: 10, padding: 10}}>
                <Image source={item.image} style={{
                    width: 50,
                    height: 50,
                    resizeMode: 'contain'
                }}/>
                <Text style={{fontSize: 14,
                fontWeight: 'bold',
                color: category == item.text ? '#fff' : 'black',
                }}>{item.text}</Text>
                    </TouchableOpacity>)}
                keyExtractor={(item) => Math.random()}
                />
            </View>
            <Formik
            initialValues={{title: '', price: ''}}
            >
                <KeyboardAvoidingView behavior='padding' style={styles.formsContainer}>
                    <View style={styles.type}>
                        
                    </View>
                    <View style={styles.formWrapper}>
                        <TextInput
                        style={styles.text}
                        placeholder='Title'
                        onChangeText={(title) => setTitle(title)}
                        
                        />
                    </View>
                    
                    <View style={styles.formWrapper}>
                        <TextInput 
                        style={styles.text}
                        placeholder='Amount'
                        onChangeText={(price) => selectedValue == 'expense' ? setPrice(price * -1) : setPrice(price)}
                        keyboardType='numeric'
                        
                        />
                    </View>
                </KeyboardAvoidingView>
            </Formik>
            
            
            {/* <Image source={items[0].image} style={{width: 50, height: 50}} /> */}
            
            
                    
                    {/* <Picker
                        mode='dropdown'
                        selectedValue={selectedValue}
                        onValueChange={(itemValue) => setSelectedValue(itemValue)}
                        >
                            <Picker.Item label='Expense' value='expense' />
                            <Picker.Item label='Income' value='income' />
                    </Picker>
                    <Picker
                        mode='dropdown'
                        selectedValue={category}
                        onValueChange={(itemValue) => setCategory(itemValue)}
                        >
                            <Picker.Item label='Entertainment' value='Entertainment' />
                            <Picker.Item label='Grocery' value='Grocery' />
                            <Picker.Item label='Investment' value='Investment' />
                            <Picker.Item label='Clothes and Shoes' value='Clothes & Shoes' />
                            <Picker.Item label='Health' value='Health' />
                            <Picker.Item label='Checks' value='Checks' />
                    </Picker> */}
                    <TouchableOpacity style={{
                        backgroundColor: '#FAAD3D',
                        padding: 10,
                        paddingVertical: 15,
                        borderRadius: 10,
                        alignItems: 'center',
                        marginTop: 10,
                    }}
                    onPress={onSubmit}
                    >
                        <Text style={{
                            color: '#fff',
                            fontWeight: '700',
                            fontSize: 15,
                        }}>ADD TRANSACTION</Text>
                    </TouchableOpacity>
                    
                    
                    
                    {/* <TouchableOpacity style={{
                        backgroundColor: '#ccc',
                        padding: 10,
                        paddingVertical: 15,
                        borderRadius: 10,
                        alignItems: 'center',
                        marginTop: 10,
                    }}
                    onPress={() => navigation.replace('Home Screen')}
                    >
                        <Text style={{
                            color: '#fff',
                            fontWeight: '700',
                            fontSize: 15,
                        }}>DISMISS</Text>
                    </TouchableOpacity> */}
                    
                
                
            

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop: 60,
    },
    formsContainer: {
        marginTop: 10,
    },
    formWrapper: {
        padding: 15,
        backgroundColor: '#fff',
        marginTop: 9,
        borderRadius: 10,
    },
    text: {
        fontSize: 16,
    },
    
})
