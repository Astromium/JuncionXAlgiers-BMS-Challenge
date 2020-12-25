import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import MarketerHomeScreen from "../screens/MarketerHomeScreen";
import AddResellerScreen from '../screens/AddResellerScreen'
import ResellerScreen from "../screens/ResellerScreen";
import MapScreen from "../screens/MapScreen";

const Home = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Marketer Navigation</Text>
    </View>
  );
};

const Stack = createStackNavigator();

export default function MarketerNavigator() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={MarketerHomeScreen} />
      <Stack.Screen name="AddResellerScreen" component={AddResellerScreen} />
      <Stack.Screen name="ResellerScreen" component={ResellerScreen} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
    </Stack.Navigator>
  );
}
