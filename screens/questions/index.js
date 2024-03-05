import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { decode } from "html-entities";
import Timer from "../../components/timer";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/header";

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const Questions = () => {
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [question, setQuestion] = useState({});
  const [selected, setSelected] = useState("");
  const navigation = useNavigation();
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    const getDetails = async () => {
      try {
        setLoading(true);
        const helpers = await AsyncStorage.getItem("helpers");
        if (helpers != null) {
          const response = JSON.parse(helpers);
          setAmount(response.amount);
          setType(response.type);
          const request = await axios.get(
            `https://opentdb.com/api.php?amount=${response.amount}&category=${response.category}&difficulty=${response.difficulty}&type=${response.type}`
          );
          const res = request.data;
          setQuestion(res.results);
          setLoading(false);
        }
      } catch (error) {
        console.log(error.response);
        setLoading(false);
      }
    };

    getDetails();
  }, [index]);

  useEffect(() => {
    if (question?.length >= 1) {
      const questions = question[index];
      let answers = [...questions?.incorrect_answers];
      answers.splice(
        getRandomInt(questions?.incorrect_answers?.length),
        0,
        questions.correct_answer
      );
      setOptions(answers);
    }
  }, [question, index]);

  const timerEnd = async () => {
    if (index + 1 < question?.length) {
      setIndex((prev) => prev + 1);
    } else {
      const data = JSON.stringify(score);
      await AsyncStorage.setItem("score", data);
      navigation.navigate("final");
    }
  };

  const handleClick = async (data) => {
    const answer = question[index]?.correct_answer;
    setSelected(data);

    if (data === answer) {
      setScore((prev) => prev + 1);
    }

    if (index + 1 < question?.length) {
      setTimeout(() => {
        setIndex(index + 1);
        setSelected("");
      }, 500);
    } else {
      const data = JSON.stringify(score);
      await AsyncStorage.setItem("score", data);
      navigation.navigate("final");
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View>
        <Header question={amount} index={index} type={type} />
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <SafeAreaView>
            <Timer timerEnd={timerEnd} />
            <Text style={styles.question}>
              {decode(question[index]?.question)}
            </Text>
            <View style={styles.answer_box}>
              {options.map((option, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[styles.btn, option === selected && styles.btnBorder]}
                  onPress={() => handleClick(option)}
                >
                  <Text style={styles.btnText}>{decode(option)}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </SafeAreaView>
        )}
      </View>
    </ScrollView>
  );
};

export default Questions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: 20,
    paddingVertical: 150,
  },

  question: {
    color: colors.white,
    fontSize: 20,
    fontFamily: "bold",
  },

  answer_box: {
    marginTop: 30,
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },

  btn: {
    backgroundColor: colors.secondary,
    padding: 20,
    borderRadius: 20,
  },

  correct: {
    backgroundColor: colors.correct,
    padding: 20,
    borderRadius: 20,
  },

  btnText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: "medium",
  },

  btnBorder: {
    borderWidth: 1,
    borderColor: colors.primary,
  },
});
