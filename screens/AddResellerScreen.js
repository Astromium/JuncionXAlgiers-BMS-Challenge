import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal
} from "react-native";
import * as Location from "expo-location";
import * as Yup from "yup";
import { Formik } from "formik";
import { AntDesign } from "@expo/vector-icons";

import AppText from "../components/AppText";
import AppInput from "../components/AppInput";
import colors from "../config/colors";
import seller from "../api/seller";
import AuthContext from "../context/AuthContext";
import BmsProductsModal from '../screens/BmsProductsModal'
import marketer from "../api/marketer";

const { width } = Dimensions.get("window");
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  phone: Yup.string().required(),
  rating: Yup.string().required(),
});

export default function CreateSellerAccountScreen({navigation}) {
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [location, setLocation] = useState([]);
  const [bmsProducts, setBmsProducts] = useState([])
  const [modalVisible, setModalVisible] = useState(false)

  const { onAuth } = useContext(AuthContext);

  const requestLocation = async () => {
    setLocationLoading(true);
    try {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("You Need To Allow The Location Permission");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;
      setLocation([latitude, longitude]);
      setLocationLoading(false);
    } catch (err) {
      setLocationLoading(true);
      console.log(err);
    }
  };
  const handleRegister = async (values) => {
      setLoaderVisible(true)
    const { firstName, lastName, phone, rating } = values;

    const res = await marketer.addSeller(
      firstName,
      lastName,
      phone,
      location,
      bmsProducts,
      rating
    );
    if (res.status === "success") {
      setLoaderVisible(false)
      navigation.navigate('Home')
    } else {
      console.log(res);
    }
    console.log(bmsProducts);
  };
  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center" }}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <View
        style={{
          backgroundColor: colors.primary,
          paddingVertical: 40,
          borderBottomLeftRadius: 60,
        }}
      >
        <AppText style={styles.heading}>
          We Need You Need To Fill a Few Informations
        </AppText>
      </View>
      <View style={styles.inputContainer}>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            phone: "",
            rating: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => handleRegister(values)}
        >
          {({ errors, touched, handleChange, handleSubmit, values }) => (
            <>
              <AppInput
                placeholder="First Name"
                icon="account"
                keyboardType="default"
                onChange={handleChange("firstName")}
                value={values.firstName}
              />
              {errors.firstName && touched.firstName && (
                <AppText style={styles.error}>{errors.firstName}</AppText>
              )}

              <AppInput
                placeholder="Last Name"
                icon="account"
                keyboardType="default"
                onChange={handleChange("lastName")}
                value={values.lastName}
              />
              {errors.lastName && touched.lastName && (
                <AppText style={styles.error}>{errors.lastName}</AppText>
              )}

              <AppInput
                placeholder="Phone Number"
                icon="contacts"
                keyboardType="phone-pad"
                onChange={handleChange("phone")}
                value={values.phone}
              />
              {errors.phone && touched.phone && (
                <AppText style={styles.error}>{errors.phone}</AppText>
              )}

              <AppInput
                placeholder="Reseller Rating"
                icon="star"
                keyboardType="number-pad"
                onChange={handleChange("rating")}
                value={values.rating}
              />
              {errors.rating && touched.rating && (
                <AppText style={styles.error}>{errors.rating}</AppText>
              )}

              <View style={styles.locationSection}>
                <AppText style={styles.locationSectionTitle}>
                  We Need To Have Access To Your Location
                </AppText>
                <TouchableOpacity
                  onPress={requestLocation}
                  style={[
                    styles.locationBtn,
                    {
                      backgroundColor:
                        location.length === 0 ? colors.primary : colors.white,
                    },
                  ]}
                >
                  <AppText
                    style={[
                      styles.locationBtnText,
                      {
                        color:
                          location.length === 0 ? colors.white : colors.primary,
                      },
                    ]}
                  >
                    {location.length === 0
                      ? "Tap To Allow Location Access"
                      : "Location Acquired"}
                  </AppText>
                </TouchableOpacity>
                {locationLoading && (
                  <ActivityIndicator
                    animating={locationLoading}
                    color={colors.primary}
                  />
                )}
              </View>

              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={[styles.button, { backgroundColor: colors.white, flexDirection: 'row' }]}
              >
                <AntDesign name='plus' size={22} color={colors.primary} />
                <AppText style={[styles.btnText, { color: colors.primary, fontSize: 22, marginLeft: 5 }]}>Add Bms Products</AppText>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                {loaderVisible ? (
                  <ActivityIndicator
                    color={colors.white}
                    animating={loaderVisible}
                    size="small"
                  />
                ) : (
                  <AppText style={styles.btnText}>Add Reseller</AppText>
                )}
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
      <Modal visible={modalVisible} animationType="slide">
        <BmsProductsModal
          onBackPress={() => setModalVisible(false)}
          onSave={(addedProducts) => {
            setBmsProducts(addedProducts);
            setModalVisible(false);
          }}
        />
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  heading: {
    fontSize: 24,
    textAlign: "center",
    color: colors.white,
    opacity: 0.9,
  },
  button: {
    paddingHorizontal: 25,
    paddingVertical: 12,
    marginTop: 20,
    backgroundColor: colors.primary,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    //elevation: 1.5,
  },
  btnText: {
    fontSize: 18,
    color: colors.white,
    opacity: 0.9,
  },
  inputContainer: {
    width: width,
    paddingHorizontal: 40,
    flex: 1,
    paddingVertical: 10,
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  error: {
    marginLeft: 10,
    color: colors.primary,
  },
  locationSection: {
    padding: 20,
    alignItems: "center",
  },
  locationSectionTitle: {
    fontSize: 20,
    color: colors.black,
    opacity: 0.65,
    textAlign: "center",
  },
  locationBtn: {
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  locationBtnText: {
    fontSize: 16,
    color: colors.white,
  },
});
