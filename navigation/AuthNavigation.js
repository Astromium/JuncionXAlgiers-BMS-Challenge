import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LandingScreen from '../screens/LandingScreen'
import MarketerRegister from '../screens/MarketerRegister'
import MarketerLogin from '../screens/MarketerLogin'
import SellerRegister from '../screens/SellerRegister'
import SellerLogin from '../screens/SellerLogin'
import CreateSellerAccountScreen from '../screens/CreateSellerAccountScreen'

const Stack = createStackNavigator()

export default function AuthNavigator() {
    return (
      <Stack.Navigator initialRouteName="Landing" headerMode="none">
        <Stack.Screen component={LandingScreen} name="Landing" />
        <Stack.Screen name="MarketerRegister" component={MarketerRegister} />
        <Stack.Screen name="MarketerLogin" component={MarketerLogin} />
        <Stack.Screen name="SellerRegister" component={SellerRegister} />
        <Stack.Screen name="SellerLogin" component={SellerLogin} />
        <Stack.Screen name="CreateSellerAccountScreen" component={CreateSellerAccountScreen} />
      </Stack.Navigator>
    );
}