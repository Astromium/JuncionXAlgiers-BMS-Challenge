import React from 'react'
import { View, StyleSheet, Text, Dimensions, StatusBar, TouchableOpacity, Image } from 'react-native'
import AppText from '../components/AppText';
import Logo from '../components/Logo';
import * as Animatable from 'react-native-animatable'

import colors from '../config/colors'
const { width, height } = Dimensions.get('window')

const fadeIn = {
  0: {
    opacity: 0
  },
  1: {
    opacity: 1
  }
}

const slideLeft = {
  0: {
    transform: [{ translateX: width }],
  },
  1: {
    transform: [{ translateX: 0 }],
  },
};

const slideUp = {
  0: {
    transform: [{ translateY: height }],
  },
  1: {
    transform: [{ translateY: 0 }],
  },
};

export default function LandingScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <Animatable.View animation={slideLeft} useNativeDriver={true} duration={1000} delay={200} style={styles.logo}>
          {/* <Image source={require('../assets/BMS.png')} style={{ width: width, height: height * 0.5, resizeMode: 'contain' }} resizeMode='cover' /> */}
          <Logo width={width} height={height * 0.5} />
        </Animatable.View>
        <Animatable.View animation={slideUp} useNativeDriver={true} duration={1000} delay={500} style={styles.ctaContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("MarketerRegister")}
            style={styles.button}
          >
            <AppText style={styles.buttonText}>
              Create Your Marketer Account
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("MarketerLogin")}
            style={{
              width,
              padding: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AppText
              style={{
                fontSize: 20,
                fontWeight: "800",
                color: colors.primary,
              }}
            >
              Already Have an Account ? Login
            </AppText>
          </TouchableOpacity>
          {/* <View style={styles.seperatorContainer}>
            <View style={styles.seperator} />
            <AppText style={{ fontSize: 18, opacity: 0.8 }}>or</AppText>
            <View style={styles.seperator} />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("SellerRegister")}
            style={styles.button}
          >
            <AppText style={styles.buttonText}>Are You a Seller ?</AppText>
          </TouchableOpacity> */}
        </Animatable.View>
        <Animatable.View animation={fadeIn} useNativeDriver={true} duration={1500} delay={1000} style={styles.footer}>
          <AppText style={styles.footerText}>
            BMS Electric | All Rights Reserved 2020
          </AppText>
        </Animatable.View>
        <StatusBar hidden={true} />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    position: "relative",
  },
  logo: {
    width,
    height: height * 0.5,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 100,
  },
  ctaContainer: {
    width,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    borderTopRightRadius: 100
  },
  button: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 25,
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 18,
    color: colors.white,
  },
  footer: {
    width,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    opacity: 0.6,
    fontSize: 16,
  },
  seperatorContainer: {
      width,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
  },
  seperator: {
      flex: 1/3,
      height: 4,
      borderRadius: 20,
      opacity: 0.75,
      marginHorizontal: 5,
      backgroundColor: colors.primary
  }
});