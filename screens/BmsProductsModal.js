import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import AppText from '../components/AppText';
import { Ionicons } from '@expo/vector-icons'
import colors from '../config/colors';

const { width, height } = Dimensions.get('window')

const PRODUCTS = [
  {
    id: 1,
    name: "AB 5m",
  },
  {
    id: 2,
    name: "AB 10m",
  },
  {
    id: 3,
    name: "La douille H/F",
  },
  {
    id: 4,
    name: "Adaptateur Fiche",
  },
  {
    id: 5,
    name: "16 A (Branche 3 ,4 ,6)",
  },
  {
    id: 6,
    name: "10 A (Branche 3 ,4)",
  },
  {
    id: 7,
    name: "Fiche Voleuse",
  },
  {
    id: 8,
    name: "Lampe LED Blanche",
  },
];

export default function BmsProductsModal({ onBackPress, onSave }) {
    const [products, setProducts] = useState(PRODUCTS)
    const [addedProducts, setAddedProducts] = useState([])

    const handleItemPress = (product) => {
        addedProducts.push(product)
        let arr = products.filter((prod) => prod.name !== product.name);
        setProducts(arr)
    }
    return (
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            width,
            height: height * 0.1,
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: colors.white,
            marginBottom: 20
          }}
        >
          <TouchableOpacity style={{ marginLeft: 10 }} onPress={onBackPress}>
            <Ionicons name="ios-arrow-back" size={30} color={colors.primary} />
          </TouchableOpacity>
          <AppText style={{ fontSize: 22, color: colors.primary, flex: 1, textAlign: 'center' }}>
            BMS Products
          </AppText>
        </View>
        {products.map((product) => {
            return(
                <TouchableOpacity onPress={() => handleItemPress(product)} key={product.id} style={{ paddingVertical: 20 }}>
                    <AppText style={{ fontSize: 18, opacity: 0.85 }}>{product.name}</AppText>
                </TouchableOpacity>
            )
        })}
        <View>
            <TouchableOpacity onPress={() => onSave(addedProducts)} style={{ paddingHorizontal: 20, paddingVertical: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary, width: width * 0.4, marginVertical: 20, borderRadius: 15 }}>
                <AppText style={{ fontSize: 18, color: colors.white }}>Save</AppText>
            </TouchableOpacity>
        </View>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
