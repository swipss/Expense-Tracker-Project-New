import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Touchable, KeyboardAvoidingView, Keyboard } from 'react-native';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import {addTransaction} from '../../redux/store/actions/transactionAction';
import { Picker } from '@react-native-picker/picker'
import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import AntDesign from 'react-native-vector-icons/AntDesign'

export default function AddTransaction({navigation, modalVisible, setModalVisible}) {
    // console.log(selectedValue, category);
    
    
    const dispatch = useDispatch();
    const [selectedValue, setSelectedValue] = useState("expense");
    const [category, setCategory] = useState('Entertainment');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');

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
                    <Picker
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
                    </Picker>
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
                    
                </KeyboardAvoidingView>
                
            </Formik>

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
