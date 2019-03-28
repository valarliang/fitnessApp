import React, { Component } from 'react';
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { addEntry } from "../actions";
import MetricCard from './MetricCard';
import TextBtn from "./TextBtn";
import { dailyReminder, timeToString } from '../utils/helpers';
import { white } from '../utils/colors';
import { removeEntry } from "../utils/api";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
    justifyContent: 'space-between',
  },
});

class EntryDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params;

    const year = entryId.slice(0, 4);
    const month = entryId.slice(5, 7);
    const day = entryId.slice(8);

    return {
      title: `${month}/${day}/${year}`,
    };
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.metrics !== null && !nextProps.metrics.remind;
  }

  reset = () => {
    const { remove, goBack, entryId } = this.props;
    remove();
    goBack();
    removeEntry(entryId);
  }

  render() {
    return (
      <View style={styles.container}>
        <MetricCard metrics={this.props.metrics} />
        <TextBtn onPress={this.reset}>RESET</TextBtn>
      </View>
    );
  }
}

function mapStateToProps(state, { navigation }) {
  const { entryId } = navigation.state.params;
  return {
    entryId,
    metrics: state[entryId],
  };
}

function mapDispatchToProps(dispatch, { navigation }) {
  const { entryId } = navigation.state.params;
  return {
    remove: () => dispatch(addEntry({
      [entryId]: timeToString() === entryId
        ? dailyReminder
        : null,
    })),
    goBack: () => navigation.goBack(),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EntryDetail);
