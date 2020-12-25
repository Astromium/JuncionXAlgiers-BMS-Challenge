import React, {useState, useContext} from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import * as Location from "expo-location";
import * as Yup from "yup";
import { Formik } from "formik";

import AppText from '../components/AppText'
import AppInput from '../components/AppInput'
import colors from '../config/colors'
import seller from '../api/seller'
import AuthContext from '../context/AuthContext'



const { width } = Dimensions.get('window')
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  phone: Yup.string().required(),
});



export default function CreateSellerAccountScreen({ route }) {
    const {data} = route.params
    const [loaderVisible, setLoaderVisible] = useState(false)
    const [locationLoading, setLocationLoading] = useState(false)
    const [location, setLocation] = useState([])

    const { onAuth } = useContext(AuthContext)

    const requestLocation = async () => {
        setLocationLoading(true)
        try {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== "granted") {
              Alert.alert("You Need To Allow The Location Permission");
              return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = currentLocation.coords;
            setLocation([latitude, longitude]);
            setLocationLoading(false)
        } catch (err) {
            setLocationLoading(true)
            console.log(err);
        }
    }
    const handleRegister = async (values) => {
        const { email, password, passwordConfirm } = data
        const { firstName, lastName, phone } = values
        
        const res = await seller.signUp(firstName, lastName, phone, email, passwordConfirm, password, location)
        if(res.status === 'success') {
            await onAuth(res.user)
        } else {
            console.log(res);
        }
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
                            location.length === 0
                              ? colors.white
                              : colors.primary,
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

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                  {loaderVisible ? (
                    <ActivityIndicator
                      color={colors.white}
                      animating={loaderVisible}
                      size="small"
                    />
                  ) : (
                    <AppText style={styles.btnText}>Create Account</AppText>
                  )}
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
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
      color: colors.white
  }
});
