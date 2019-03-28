import React, { Component } from "react";
import {
  View, Text, TouchableOpacity, Platform, StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import { Entypo, Ionicons } from "@expo/vector-icons";
import {
  getMetricMetaInfo, timeToString, dailyReminder, setLocalNotification, clearLocalNotification,
} from "../utils/helpers";
import MySlider from "./MySlider";
import MySteper from "./MySteper";
import DateHeader from "./DateHeader";
import TextBtn from "./TextBtn";
import { submitEntry, removeEntry } from "../utils/api";
import { addEntry } from "../actions";
import { purple } from "../utils/colors";
import TopStatusBar from "./TopStatusBar";

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    justifyContent: 'space-around',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    margin: 30,
    alignItems: 'center',
  },
});

class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  }

  submit = () => {
    const key = timeToString();
    const entry = this.state;
    this.props.dispatch(addEntry({ [key]: entry }));
    this.setState({
      run: 0, bike: 0, swim: 0, sleep: 0, eat: 0,
    });
    this.toHome();
    submitEntry({ key, entry });
    clearLocalNotification().then(setLocalNotification);
  }

  reset = () => {
    const key = timeToString();
    this.props.dispatch(addEntry({ [key]: dailyReminder }));
    this.toHome();
    removeEntry(key);
  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({ key: 'AddEntry' }));
  }

  increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric);
    this.setState((state) => {
      const cont = state[metric] + step;
      return { ...state, [metric]: cont > max ? max : cont };
    });
  }

  decrement = (metric) => {
    this.setState((state) => {
      const cont = state[metric] - getMetricMetaInfo(metric).step;
      return { ...state, [metric]: cont > 0 ? cont : 0 };
    });
  }

  slide = (metric, value) => {
    this.setState({ [metric]: value });
  }

  render() {
    const metaInfo = getMetricMetaInfo();
    if (this.props.alreadyLogged) {
      return (
        <View style={{ flex: 1 }}>
          <TopStatusBar />
          <View style={styles.center}>
            {Platform.OS === 'ios'
              ? <Entypo name="emoji-happy" size={100} />
              : <Ionicons name="md-happy" size={100} />
            }
            <Text>You already logged your imformation for today</Text>
            <TouchableOpacity onPress={this.reset}>
              <Text style={{ color: purple, fontSize: 20 }}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <TopStatusBar />
        <View style={styles.container}>
          <DateHeader date={new Date().toLocaleDateString()} />
          {Object.keys(metaInfo).map((key) => {
            const { getIcon, type, ...rest } = metaInfo[key];
            const value = this.state[key];
            return (
              <View key={key} style={{ flexDirection: 'row', alignItems: 'center' }}>
                {getIcon()}
                {type === 'stepper'
                  ? (
                    <MySteper
                      value={value}
                      onIncrement={() => this.increment(key)}
                      onDecrement={() => this.decrement(key)}
                      {...rest}
                    />
                  )
                  : (
                    <MySlider
                      value={value}
                      onChange={() => this.slide(key, value)}
                      {...rest}
                    />
                  )
                }
              </View>
            );
          })}
          <TextBtn onPress={this.submit}>SUBMIT</TextBtn>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const key = timeToString();
  return {
    alreadyLogged: state[key] && !state[key].remind,
  };
}

export default connect(mapStateToProps)(AddEntry);
