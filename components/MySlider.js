import React from "react";
import {
  View, Slider, Text, StyleSheet,
} from "react-native";

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  metricCounter: {
    width: 85,
    alignItems: 'center',
    fontSize: 20,
  },
});

export default function MySlider({
  max, unit, step, value, onChange,
}) {
  return (
    <View style={styles.row}>
      <Slider
        style={{ flex: 1 }}
        step={step}
        value={value}
        maximumValue={max}
        minimumValue={0}
        onValueChange={onChange}
      />
      <View style={styles.metricCounter}>
        <Text style={{ fontSize: 24 }}>{value}</Text>
        <Text style={{ fontSize: 18 }}>{unit}</Text>
      </View>
    </View>
  );
}
