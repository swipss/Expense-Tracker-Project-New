import { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, Modal, Pressable, Alert, } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Entypo from 'react-native-vector-icons/Entypo'

import Home from "../screens/Home";
import Categories from "../screens/Categories";
import AddTransaction from "../components/HomeComponents/AddTransaction";
import Market from "../screens/Market";
import Profile from "../screens/Profile";


const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({navigation}) => {

    return (
        <View>
            {/* <View>
                <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
                >
                    <AddTransaction modalVisible={modalVisible} setModalVisible={setModalVisible} /> */}
                    {/* <Pressable
                    style={{
                        position: 'absolute',
                        bottom: 0,
                    }}
                    onPress={() => setModalVisible(!modalVisible)}
                    >
                         <Text>Close</Text>
                    </Pressable> */}

                {/* </Modal>
            </View> */}
            
            <Pressable
            style={[styles.buttonOpen, styles.button, {marginTop: -35}]}
            onPress={() => navigation.navigate('Add Transaction')}
            >
                <Entypo name="plus" size={28} color={'white'} />
            </Pressable>
            
        </View>
    )

}

export default function Tabs({navigation}) {
  return (
    <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
            position: 'absolute',
            bottom: 10,
            left: 20,
            right: 20,
            elevation: 0,
            backgrounColor: '#fff',
            borderRadius: 15,
            height: 90,
            ...styles.shadow
        }
    }}>
        <Tab.Screen name="Home" component={Home} options={{
            tabBarIcon: ({focused}) => (
                <View style={{ alignItems: 'center', justifyContent: "center", top: Platform.OS === 'ios' ? 10 : 0}}>
                    <Image source={require('../assets/icons/home.png')} resizeMode="contain" style={{
                        width: 25,
                        height: 25,
                        tintColor: focused ? '#FAAD3D' : '#748c94'
                    }}/>
                        
                </View>
            ),
            
        }}/>
        
        <Tab.Screen name="Categories" component={Categories} options={{
            tabBarIcon: ({focused}) => (
                <View style={{ alignItems: 'center', justifyContent: "center", top: Platform.OS === 'ios' ? 10 : 0}}>
                    <Image source={require('../assets/icons/categories.png')} resizeMode="contain" style={{
                        width: 25,
                        height: 25,
                        tintColor: focused ? '#FAAD3D' : '#748c94'
                    }}/>
                    
                </View>
            ),
        }} />
        <Tab.Screen name='Add Transaction' component={AddTransaction} options={{
            tabBarButton: () => (<CustomTabBarButton navigation={navigation} />)
        }} />
        <Tab.Screen name="Market" component={Market} options={{
            tabBarIcon: ({focused}) => (
                <View style={{ alignItems: 'center', justifyContent: "center", top: Platform.OS === 'ios' ? 10 : 0}}>
                    <Image source={require('../assets/icons/bar-chart.png')} resizeMode="contain" style={{
                        width: 25,
                        height: 25,
                        tintColor: focused ? '#FAAD3D' : '#748c94'
                    }}/>
                    
                </View>
            ),
        }} />
        <Tab.Screen name="Profile" component={Profile} options={{
            tabBarIcon: ({focused}) => (
                <View style={{ alignItems: 'center', justifyContent: "center", top: Platform.OS === 'ios' ? 10 : 0}}>
                    <Image source={require('../assets/icons/user.png')} resizeMode="contain" style={{
                        width: 25,
                        height: 25,
                        tintColor: focused ? '#FAAD3D' : '#748c94'
                    }}/>
                    
                </View>
            ),
        }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
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
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 50,
      padding: 20,
      elevation: 2,
      
      
    },
    buttonOpen: {
      backgroundColor: "#FAAD3D",
      
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
})