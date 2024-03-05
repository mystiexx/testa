import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFormik } from "formik";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";

const Settings = () => {
  const [user, setUser] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const request = await axios.get(`https://opentdb.com/api_category.php`);
        const response = request.data;
        setCategories(
          response.trivia_categories.map((data) => {
            return {
              label: data.name,
              value: data.id,
            };
          })
        );
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const data = await AsyncStorage.getItem("user");

      if (data != null) {
        const value = JSON.parse(data);
        setUser(value);
      }
    };

    getData();
  }, []);

  const difficultyOptions = [
    { label: "Easy", value: "easy" },
    { label: "Medium", value: "medium" },
    { label: "Hard", value: "hard" },
  ];

  const typeOptions = [
    { value: "multiple", label: "Mutiple Choice" },
    { value: "boolean", label: "True/False" },
  ];

  const formik = useFormik({
    initialValues: {
      amount: "",
      category: "",
      difficulty: "",
      type: "",
    },

    onSubmit: async (values) => {
      const data = JSON.stringify(values);
      await AsyncStorage.setItem("helpers", data);
        navigation.navigate("questions");
    },
    validateOnChange: true,
    validationSchema: Yup.object({
      amount: Yup.string().required("Amount is required!"),
      category: Yup.string().required("Category is required!"),
      difficulty: Yup.string().required("Difficulty is required!"),
      type: Yup.string().required("Type is required!"),
    }),
  });

  const handleFocus = (field) => {
    formik.setFieldTouched(field);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <SafeAreaView>
          <Text style={styles.title}>Hello there, {user?.name} 👋</Text>
          <Text style={styles.sub}>
            Your Journey Begins with Personalized Questions!
          </Text>

          <View style={styles.form}>
            <View>
              <Text style={styles.label}>Number of Questions</Text>
              <TextInput
                placeholder="10"
                placeholderTextColor={colors.secondary}
                keyboardType="numeric"
                style={[
                  styles.input,
                  formik.touched.amount && styles.inputTouched,
                ]}
                onBlur={formik.handleBlur("amount")}
                onChangeText={formik.handleChange("amount")}
                onFocus={() => handleFocus("amount")}
              />
              {formik.touched.amount && formik.errors.amount && (
                <Text style={styles.error}>{formik.errors.amount}</Text>
              )}
            </View>

            <View>
              <Text style={styles.label}>Category</Text>
              <View>
                <RNPickerSelect
                  onFocus={() => handleFocus("category")}
                  onValueChange={(value) =>
                    formik.setFieldValue("category", value)
                  }
                  placeholder={{ label: "Select Category", value: null }}
                  items={categories}
                  style={pickerStyles}
                />
              </View>
              {formik.touched.category && formik.errors.category && (
                <Text style={styles.error}>{formik.errors.category}</Text>
              )}
            </View>

            <View>
              <Text style={styles.label}>Difficulty</Text>
              <View>
                <RNPickerSelect
                  onValueChange={(value) =>
                    formik.setFieldValue("difficulty", value)
                  }
                  placeholder={{ label: "Select Difficulty", value: null }}
                  items={difficultyOptions}
                  style={pickerStyles}
                />
              </View>
              {formik.touched.difficulty && formik.errors.difficulty && (
                <Text style={styles.error}>{formik.errors.difficulty}</Text>
              )}
            </View>

            <View>
              <Text style={styles.label}>Type</Text>
              <View>
                <RNPickerSelect
                  onValueChange={(value) => formik.setFieldValue("type", value)}
                  placeholder={{ label: "Select Type", value: null }}
                  items={typeOptions}
                  style={pickerStyles}
                />
              </View>
              {formik.touched.type && formik.errors.type && (
                <Text style={styles.error}>{formik.errors.type}</Text>
              )}
            </View>

            <TouchableOpacity
              style={[styles.btn, { opacity: !formik.dirty ? 0.4 : 1 }]}
              onPress={!formik.dirty ? null : formik.handleSubmit}
            >
              <Text style={styles.btnText}>Start</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: 20,
    paddingVertical: 150,
  },

  title: {
    fontFamily: "Black",
    color: colors.white,
    fontSize: 25,
  },

  sub: {
    color: colors.white,
    fontSize: 14,
    fontFamily: "medium",
    marginTop: 6,
  },

  form: {
    marginTop: 40,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },

  label: {
    color: colors.white,
    fontSize: 12,
    fontFamily: "medium",
    marginBottom: 5,
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

  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});

const pickerStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: colors.input,
    padding: 16,
    borderRadius: 6,
    color: colors.white,
  },
});
