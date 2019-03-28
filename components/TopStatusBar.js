import React from 'react';
import { View } from 'react-native';
import { Constants } from 'expo'
import { purple } from "../utils/colors";

const TopStatusBar = () => (
  <View style={{ backgroundColor: purple, height: Constants.statusBarHeight }} />
);

export default TopStatusBar;
