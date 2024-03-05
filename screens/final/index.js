import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { colors } from "../../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Final = () => {
  const navigation = useNavigation();
  const [percentage, setPercentage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getScore = async () => {
      try {
        setLoading(true);
        const score = await AsyncStorage.getItem("score");
        const helpers = await AsyncStorage.getItem("helpers");
        if (score != null && helpers != null) {
          const response = JSON.parse(score);
          const res = JSON.parse(helpers);
          const percentage = (response / res.amount) * 100;
          console.log(percentage);
          setPercentage(Math.round(percentage));
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getScore();
  }, []);

  let message = ``;
  if (percentage === 100) {
    message = "Great job! You got a perfect score!";
  } else if (percentage >= 75) {
    message = "Well done! You did a fantastic job!";
  } else if (percentage >= 50) {
    message = "Good effort! Keep practicing to improve.";
  } else {
    message = "Keep trying! You can do better with more practice.";
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size={"large"} color={colors.primary} />
      ) : (
        <SafeAreaView>
          <View>
            <Text style={styles.score}>Score:</Text>
            <Text style={styles.percent}>{percentage}%</Text>
          </View>

          <Text style={styles.message}>{message}</Text>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("settings")}
          >
            <Text style={styles.btnText}>Play again</Text>
          </TouchableOpacity>
        </SafeAreaView>
      )}
    </View>
  );
};

export default Final;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: 20,
    paddingVertical: 400,
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
  score: {
    color: colors.sub,
    textAlign: "center",
    fontSize: 14,
    fontFamily: "bold",
  },

  message: {
    color: colors.sub,
    textAlign: "center",
    fontSize: 14,
    fontFamily: "bold",
  },

  percent: {
    color: colors.white,
    textAlign: "center",
    fontSize: 50,
    fontFamily: "Black",
    marginBottom: 10,
  },
});
