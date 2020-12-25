import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import AppInput from "../components/AppInput";
import AppText from "../components/AppText";
import colors from "../config/colors";
const { width } = Dimensions.get("window");

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(8),
  passwordConfirm: Yup.string()
    // .oneOf([Yup.ref("password"), null], "Passwords must match")
    // .required("Password confirm is required"),
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Password confirm is required"),
});

export default function MarketerRegister({ navigation }) {
  

    const handleNext = (values) => {
        navigation.navigate('CreateSellerAccountScreen', { data: values })
    }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ position: "absolute", top: 40, left: 20 }}
      >
        <Ionicons name="ios-arrow-back" size={34} color={colors.primary} />
      </TouchableOpacity>
      <View style={styles.header} />
      <View style={styles.inputContainer}>
        <Formik
          initialValues={{
            email: "",
            password: "",
            passwordConfirm: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => handleNext(values)}
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
              <AppInput
                placeholder="Confirm Password"
                icon="lock"
                secureTextEntry
                onChange={handleChange("passwordConfirm")}
                value={values.passwordConfirm}
              />
              {errors.passwordConfirm && touched.passwordConfirm && (
                <AppText style={styles.error}>{errors.passwordConfirm}</AppText>
              )}

              <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                
                  <AppText style={styles.btnText}>Next</AppText>
               
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("SellerLogin")}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
    width: width * 0.8,
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  error: {
    marginLeft: 10,
    color: colors.primary,
  },
});
