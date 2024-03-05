import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { colors } from "../../constants/theme";
import { useFormik } from "formik";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: async (values) => {
      const data = JSON.stringify(values);
      await AsyncStorage.setItem("user", data);
      navigation.navigate("help");
    },
  });

  const handleFocus = (field) => {
    formik.setFieldTouched(field);
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.form}>
          <View>
            <Text style={styles.title}>Full Name</Text>
            <TextInput
              placeholder="Full Name"
              onChangeText={formik.handleChange("name")}
              style={[styles.input, formik.touched.name && styles.inputTouched]}
              onBlur={formik.handleBlur("name")}
              placeholderTextColor={colors.secondary}
              onFocus={() => handleFocus("name")}
            />
            <TouchableOpacity
              style={[styles.btn, { opacity: !formik.dirty ? 0.4 : 1 }]}
              onPress={!formik.dirty ? null : formik.handleSubmit}
            >
              <Text style={styles.btnText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: colors.bg,
    padding: 20,
  },

  form: {
    paddingVertical: 300,
  },

  title: {
    color: colors.white,
    fontSize: 14,
    fontFamily: "medium",
    marginBottom: 10,
  },

  input: {
    backgroundColor: colors.input,
    padding: 16,
    borderRadius: 6,
    color: colors.white,
  },

  inputTouched: {
    borderColor: colors.primary,
    borderWidth: 1,
  },

  btn: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 10,
    marginTop: 24,
  },

  btnText: {
    color: colors.white,
    fontFamily: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
