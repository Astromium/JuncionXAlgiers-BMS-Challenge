import React from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Linking } from "react-native";
import AppText from '../components/AppText';
import Avatar from '../components/Avatar';
import colors from '../config/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'
const { width, height } = Dimensions.get("window");

const slideIn = {
  0: {
    transform: [{ translateY: -height }],
  },
  1: {
    transform: [{ translateY: 0 }],
  },
};

const slideRight = {
  0: {
    transform: [{ translateX: -width}],
  },
  1: {
    transform: [{ translateX: 0 }],
  },
};



export default function ResellerScreen({route, navigation}) {
    const {data} = route.params
    return (
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        style={styles.container}
      >
        <Animatable.View
          animation={slideIn}
          useNativeDriver={true}
          duration={1000}
          style={styles.header}
        >
          <Avatar height={height * 0.25} width={width * 0.5} />
        </Animatable.View>
        <Animatable.View
          animation={slideRight}
          useNativeDriver={true}
          duration={1000}
          delay={200}
          style={styles.item}
        >
          <AppText style={styles.title}>First Name</AppText>
          <AppText style={styles.subTitle}>{data.firstName}</AppText>
        </Animatable.View>
        <Animatable.View
          animation={slideRight}
          useNativeDriver={true}
          duration={1000}
          delay={400}
          style={styles.item}
        >
          <AppText style={styles.title}>Last Name</AppText>
          <AppText style={styles.subTitle}>{data.lastName}</AppText>
        </Animatable.View>
        <Animatable.View
          animation={slideRight}
          useNativeDriver={true}
          duration={1000}
          delay={600}
          style={styles.item}
        >
          <AppText style={styles.title}>Phone Number</AppText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AppText style={styles.subTitle}>0{data.phone}</AppText>
            <TouchableOpacity
              style={{
                marginLeft: 20,
                paddingHorizontal: 10,
                paddingVertical: 4,
                backgroundColor: colors.primary,
                borderRadius: 10,
              }}
              onPress={() => Linking.openURL("tel:${0" + data.phone + "}")}
            >
              <AppText style={{ fontSize: 16, color: colors.white }}>
                Call
              </AppText>
            </TouchableOpacity>
          </View>
        </Animatable.View>
        <Animatable.View
          animation={slideRight}
          useNativeDriver={true}
          duration={1000}
          delay={800}
          style={styles.item}
        >
          <AppText style={styles.title}>Rating</AppText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AppText style={styles.subTitle}>{data.rating}</AppText>
            <MaterialCommunityIcons
              name="star"
              size={20}
              color={colors.primary}
            />
          </View>
        </Animatable.View>
        <Animatable.View
          animation={slideRight}
          useNativeDriver={true}
          duration={1000}
          delay={1000}
          style={[styles.item, { width: width * 0.85 }]}
        >
          <AppText style={styles.title}>BMS Products</AppText>
          {data.bmsProducts.map((prd, i) => {
            return (
              <AppText key={i} style={styles.subTitle}>
                {prd.name}
              </AppText>
            );
          })}
        </Animatable.View>
        <TouchableOpacity
          onPress={() => navigation.navigate("MapScreen", { data })}
          style={styles.item}
        >
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors.primary,
              borderRadius: 15,
            }}
          >
            <AppText
              style={[styles.title, { color: colors.white, fontSize: 20 }]}
            >
              View Location
            </AppText>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    width,
    height: height * 0.35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FB7C83",
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  item: {
    width: width * 0.65,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    marginVertical: 10,
    borderRadius: 15,
    elevation: 0.3,
  },
  title: {
    fontSize: 28,
    color: colors.primary,
    marginVertical: 5,
  },
  subTitle: {
    fontSize: 20,
    color: colors.black,
    opacity: 0.8,
  },
});
