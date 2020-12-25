import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import AppInput from "../components/AppInput";
import AppText from "../components/AppText";
import colors from "../config/colors";
import seller from '../api/seller'
import AuthContext from '../context/AuthContext'
const { width, height } = Dimensions.get("window");

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(8),
});

export default function MarketerRegister({ navigation }) {
  const [loaderVisible, setLoaderVisible] = useState(false);
  const {onAuth} = useContext(AuthContext)
  const handleLogin = async (values) => {
    setLoaderVisible(true)
    const res = await seller.login(values.email, values.password)
    if(res.status === 'success') {
        setLoaderVisible(false)
        await onAuth(res.user)
    } else {
        console.log(res);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ position: "absolute", top: 40, left: 20, zIndex: 10 }}
      >
        <Ionicons name="ios-arrow-back" size={34} color={colors.white} />
      </TouchableOpacity>
      <View style={styles.header}>
        <AppText
          style={{
            fontSize: 42,
            width: width * 0.5,
            color: colors.white,
          }}
        >
          Login as a Seller
        </AppText>
      </View>
      <View style={styles.inputContainer}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => handleLogin(values)}
        >
          {({ errors, touched, handleChange, handleSubmit, values }) => (
            <>
              <AppInput
                placeholder="Email"
                icon="email"
                keyboardType="email-address"
                onChange={handleChange("email")}
                value={values.email}
              />
              {errors.email && touched.email && (
                <AppText style={styles.error}>{errors.email}</AppText>
              )}
              <AppInput
                placeholder="Password"
                icon="lock"
                secureTextEntry
                onChange={handleChange("password")}
                value={values.password}
              />
              {errors.password && touched.password && (
                <AppText style={styles.error}>{errors.password}</AppText>
              )}

              <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                {loaderVisible ? (
                  <ActivityIndicator
                    color={colors.white}
                    animating={loaderVisible}
                    size="small"
                  />
                ) : (
                  <AppText style={styles.btnText}>Login</AppText>
                )}
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    position: "relative",
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
    borderTopRightRadius: 200,
  },
  error: {
    marginLeft: 10,
    color: colors.primary,
  },
  header: {
    width,
    height: height * 0.4,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 200,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
