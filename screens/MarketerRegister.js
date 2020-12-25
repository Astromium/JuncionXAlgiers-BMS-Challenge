import React, {useState, useContext} from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Formik } from "formik";
import * as Yup from "yup";
import marketer from '../api/marketer'
import AppInput from '../components/AppInput'
import AppText from "../components/AppText";
import colors from '../config/colors'
import AuthContext from '../context/AuthContext'
const { width } = Dimensions.get('window')

const validationSchema = Yup.object().shape({
  name: Yup.string().trim().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required().min(8),
  passwordConfirm: Yup.string()
    // .oneOf([Yup.ref("password"), null], "Passwords must match")
    // .required("Password confirm is required"),
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Password confirm is required"),
});

export default function MarketerRegister({ navigation }) {
    const [loaderVisible, setLoaderVisible] = useState(false)
    const {onAuth} = useContext(AuthContext)
    const handleRegister = async (values) => {
        setLoaderVisible(true)
        const { name, email, password, passwordConfirm } = values
        //console.log(name, email, password, passwordConfirm);
        const res = await marketer.signUp(name, email, password, passwordConfirm)
        if(res.status === 'success') {
            setLoaderVisible(false)
            await onAuth(res.user)
        } else {
            console.log(res);
        }
    };

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: "absolute", top: 40, left: 20 }}>
          <Ionicons name="ios-arrow-back" size={34} color={colors.primary} />
        </TouchableOpacity>
        <View style={styles.header} />
        <View style={styles.inputContainer}>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              passwordConfirm: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleRegister(values)}
          >
            {({ errors, touched, handleChange, handleSubmit, values }) => (
              <>
                <AppInput
                  placeholder="Name"
                  icon="account"
                  keyboardType="default"
                  onChange={handleChange("name")}
                  value={values.name}
                />
                {errors.name && touched.name && (
                  <AppText style={styles.error}>{errors.name}</AppText>
                )}
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
                  <AppText style={styles.error}>
                    {errors.passwordConfirm}
                  </AppText>
                )}

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
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
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
    color: colors.primary
  },
});
