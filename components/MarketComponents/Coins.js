import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

export default function Coins({ name, image, symbol, price, volume, priceChange }) {
    return (
        <View style={styles.container}>
            <View style={styles.leftContentWrapper}>
                <View style={styles.shadow}>
                    <Image source={{ uri: image}} style={[styles.image, styles.shadow]}/>

                </View>
                <View stlye={styles.titleWrapper}>
                    <Text style={styles.symbolText}>{symbol.toUpperCase()}/EUR</Text>
                    <Text style={styles.nameText}>{name}</Text>
                    <Text style={styles.volumeText}>Vol. {volume.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}</Text>
                </View>
            </View>
            <View style={styles.rightContentWrapper}>
                <Text style={styles.price}>€{price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}</Text>
                {priceChange < 0 ? (
                    <Text style={styles.percentRed}>{priceChange.toFixed(2)}%</Text>
                ) : (
                    <Text style={styles.percentGreen}>{priceChange.toFixed(2)}%</Text>

                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
    leftContentWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 55,
        height: 55,
        marginRight: 10,
        borderRadius: 50,
    },  
    titleWrapper: {

    },
    symbolText: {
        fontSize: 16,
        fontWeight: '700',
    },
    nameText: {
        color: '#748c94'
    },
    volumeText: {
        color: '#748c94'
    },
    rightContentWrapper: {
        
    },
    price: {
        fontSize: 16,
        fontWeight: '700'
    },
    percentRed: {
        color: 'red',
        textAlign: 'right',
    },
    percentGreen: {
        color: 'green',
        textAlign: 'right'
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

    }
})