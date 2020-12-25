import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import AppLoading from 'expo-app-loading'
import AsyncStorage from "@react-native-community/async-storage";
import * as Font from "expo-font";
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './navigation/AuthNavigation';
import AuthContext from "./context/AuthContext";
import SellerNavigator from './navigation/SellerNavigation'
import MarketerNavigator from './navigation/MarketerNavigation'

const fetchFont = async () => {
  return Font.loadAsync({
    //SourceSansPro: require("./assets/fonts/SourceSansPro-Regular.ttf"),
    //"Baloo2-medium": require("./assets/fonts/Baloo2-Medium.ttf"),
    "Baloo2-regular": require("./assets/fonts/Baloo2-Regular.ttf"),
    //"SourceSansPro": require("./assets/fonts/SourceSansPro-Regular.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      setUser(JSON.parse(user));
    } catch (err) {
      console.log(err);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const onAuth = async (user) => {
    setUser(user);
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
    } catch (err) {
      console.log(err);
    }
  };

  const onLogout = async () => {
    setUser(null);
    try {
      await AsyncStorage.removeItem("user");
    } catch (err) {
      console.log(err);
    }
  };

  if(!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFont}
        onError={(err) => console.log(err)}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }
  return (
    <NavigationContainer>
      <AuthContext.Provider value={{ user, onAuth, onLogout }}>
        {user === null ? <AuthNavigator /> : user.role === 'seller' ? <SellerNavigator /> : <MarketerNavigator />}
        <StatusBar style="auto" />
      </AuthContext.Provider>
    </NavigationContainer>
  );
}


