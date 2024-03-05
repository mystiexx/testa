import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";

const Help = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View>
     
        <Text style={styles.title}>Testa Trivia: Challenge Yourself with Quick Questions</Text>
        <Text style={styles.sub}>
          Greetings and welcome to Testa, where you'll encounter engaging trivia
          questions. Each question is accompanied by a 10-second timer, and your
          cumulative score will be unveiled at the conclusion of the quiz.
        </Text>

        <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('settings')}>
            <Text style={styles.btnText}>Let's Go</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Help;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: 20,
    paddingVertical: 400,
  },

  title: {
    color: colors.white,
    fontSize:20,
    fontFamily: 'bold',
    textAlign: 'center'
  },

  sub: {
    fontSize: 16,
    color: colors.sub,
    textAlign:'center',
    marginTop: 24,
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
