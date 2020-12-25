import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import SellerHomeScreen from '../screens/SellerHomeScreen';

const Home = () => {
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Seller Navigation</Text>
        </View>
    )
}

const Stack = createStackNavigator()

export default function SellerNavigator() {
    return(
        <Stack.Navigator>
            <Stack.Screen name='Home' component={SellerHomeScreen} />
        </Stack.Navigator>
    )
}