import React from "react";
import { Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { purple, white } from "../utils/colors";

const styles = StyleSheet.create({
  submitBtn: {
    height: 50,
    width: 200,
    margin: 10,
    padding: 10,
    backgroundColor: purple,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  submitText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
});

const TextBtn = ({ onPress, children }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.submitBtn, Platform.OS === 'ios' ? { borderRadius: 8 } : { borderRadius: 2 }]}
  >
    <Text style={styles.submitText}>{children}</Text>
  </TouchableOpacity>
);

export default TextBtn;
