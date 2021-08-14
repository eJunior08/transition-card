import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Button, StyleGuide, cards } from "./src/components/core";

import AnimatedCard from "./src/components/AnimatedCard";
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { useDerivedValue } from "react-native-reanimated";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
    justifyContent: "flex-end",
  },
});

const useSpring = (
  state: number | boolean,
  config?: Animated.WithSpringConfig | undefined
) => {
  const value = useSharedValue(0);

  useEffect(() => {
    value.value = typeof state === "number" ? state : state ? 1 : 0;
  }, [state, value]);

  return useDerivedValue(() => {
    return withSpring(value.value);
  });
};

const App = () => {
  const toggled = useSharedValue(false);
  // const [toggled, setToggle] = useState(false);
  const transition = useDerivedValue(() => {
    return withSpring(toggled.value);
  });
  return (
    <View style={styles.container}>
      {cards.slice(0, 3).map((card, index) => (
        <AnimatedCard key={card} {...{ index, card, transition }} />
      ))}
      <Button
        label={toggled.value ? "Reset" : "Start"}
        primary
        onPress={() => (toggled.value = !toggled.value)}
      />
    </View>
  );
};

export default App;
