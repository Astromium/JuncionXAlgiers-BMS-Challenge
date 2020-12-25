import React, {useContext} from 'react'
import { View, Text, Button } from 'react-native'
import AuthContext from '../context/AuthContext'

export default function SellerHomeScreen() {
    const {onLogout} = useContext(AuthContext)
    const handleLogout = async () => {
        await onLogout()
    }
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Seller Navigation</Text>
        <Button title='Logout' onPress={handleLogout}/>
      </View>
    );
}
