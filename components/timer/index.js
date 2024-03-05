import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../constants/theme";

const Timer = ({ timerEnd }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer;
    let remainingTime = 10000;

    const updateProgress = () => {
      if (remainingTime > 0) {
        setProgress((10000 - remainingTime) / 10000);
        remainingTime -= 100;
      } else {
        setProgress(1);
        timerEnd();
        remainingTime = 10000;
      }
    };

    updateProgress();
    timer = setInterval(updateProgress, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={{ marginBottom: 20 }}>
      <View style={styles.progessBarContainer}>
        <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
      </View>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  progessBarContainer: {
    width: "100%",
    height: 15,
    borderRadius: 20,
    backgroundColor: colors.secondary,
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 20,
  },
});
