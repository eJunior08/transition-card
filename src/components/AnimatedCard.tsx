import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import Animated, { interpolate } from "react-native-reanimated";
import { useAnimatedStyle } from "react-native-reanimated";

import { Card, Cards, StyleGuide } from "./core";

const { width } = Dimensions.get("window");
const origin = -(width / 2 - StyleGuide.spacing * 2);
const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    padding: StyleGuide.spacing * 4,
  },
});

interface AnimatedCardProps {
  transition: any;
  index: number;
  card: Cards;
}

const AnimatedCard = ({ card, transition, index }: AnimatedCardProps) => {
  const style = useAnimatedStyle(() => {
    const alpha = interpolate(
      transition.value,
      [0, 1],
      [0, ((index - 1) * Math.PI) / 5]
    );
    return {
      transform: [
        { translateX: origin },
        { rotate: `${alpha}rad` },
        { translateX: -origin },
      ],
    };
  });
  return (
    <Animated.View key={card} style={[styles.overlay, style]}>
      <Card {...{ card }} />
    </Animated.View>
  );
};

export default AnimatedCard;
