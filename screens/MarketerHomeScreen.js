import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, StatusBar, Dimensions, TouchableOpacity, ActivityIndicator, FlatList } from "react-native";
import AuthContext from "../context/AuthContext";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import colors from '../config/colors'
import AppText from '../components/AppText'
import marketer from '../api/marketer'
import Avatar from "../components/Avatar";
import { useIsFocused } from '@react-navigation/native'

const { width, height } = Dimensions.get('window')

export default function MarketerHomeScreen({navigation}) {
  const [sellers, setSellers] = useState([])
  const { onLogout, user } = useContext(AuthContext);
  const [loaderVisible, setLoaderVisible] = useState(true)
  const isFocused = useIsFocused()
  const handleLogout = async () => {
    await onLogout();
  };

  const loadSellers = async () => {
    const res = await marketer.getSellers()
    if(res.status === 'success') {
      setSellers(res.resellers)
      setLoaderVisible(false)
    } else {
      console.log(res);
    }
  }

  useEffect(() => {
    loadSellers()
  }, [isFocused])

  if(loaderVisible) {
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator animating={loaderVisible} color={colors.primary} size='large' />
      </View>
    )
  }

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      {/* <Text>Marketer Navigation</Text>
      <Button title="Logout" onPress={handleLogout} /> */}
      <View style={styles.header}>
        <View style={styles.user}>
          <MaterialCommunityIcons
            name="account"
            size={34}
            color={colors.primary}
          />
          <AppText style={styles.userName}>{user.name}</AppText>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <AppText style={{ fontSize: 18, color: colors.primary }}>
            Logout
          </AppText>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={{ width: width * 0.9, marginVertical: 5, padding: 20 }}>
          <AppText style={{ fontSize: 32 }}>All Resellers</AppText>
        </View>
        <FlatList
          data={sellers}
          horizontal
          contentContainerStyle={{ flexGrow: 0 }}
          style={{ flexGrow: 0 }}
          snapToInterval={width * 0.5 + 10}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('ResellerScreen', { data: item })}
                style={{
                  width: width * 0.5,
                  marginHorizontal: 10,
                  height: height * 0.4,
                  alignItems: "center",
                  paddingVertical: 25,
                  paddingHorizontal: 5,
                  backgroundColor: colors.white,
                  borderRadius: 15,
                }}
              >
                <Avatar width={width * 0.3} height={height * 0.2} />
                <View style={{ marginTop: 10 }}>
                  <AppText style={{ fontSize: 20, textAlign: "center" }}>
                    {item.firstName} {item.lastName}
                  </AppText>      
                </View>
                <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                  <MaterialCommunityIcons name='star' size={24} color={colors.primary} />
                  <AppText style={{ color: colors.primary, fontSize: 18, marginRight: 5 }}>{item.rating}</AppText>
                </View>
              </TouchableOpacity>
            );
          }}
        />

        <View style={{ width, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddResellerScreen')}
            style={{
              paddingHorizontal: 25,
              paddingVertical: 10,
              backgroundColor: colors.primary,
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 40,
              width: width * 0.5,
              borderRadius: 25
            }}
          >
            <AppText style={{ fontSize: 18, color: colors.white }}>
              Add a Reseller
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar hidden={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width,
    height: height * 0.12,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    elevation: 0.5,
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    height: height * 0.12,
  },
  userName: {
    fontSize: 20,
    color: colors.black,
    opacity: 0.85,
    marginLeft: 10,
  },
  content: {
    //padding: 20
  }
});
