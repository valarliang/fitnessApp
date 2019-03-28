import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View, Text, StyleSheet, Platform, TouchableOpacity,
} from "react-native";
import UdacifitnessCalendar from "udacifitness-calendar";
import Spinner from 'react-native-loading-spinner-overlay';
import { loadCalendar } from "../actions";
import DateHeader from "./DateHeader";
import MetricCard from "./MetricCard";
import { white } from "../utils/colors";
import TopStatusBar from "./TopStatusBar";

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
});

class History extends Component {
  state = {
    spinner: true,
  }

  componentDidMount() {
    this.props.dispatch(loadCalendar()).then(() => this.setState({ spinner: false }));
  }

  renderItem = ({ remind, ...metrics }, formattedDate, key) => (
    <View style={styles.item}>
      {remind
        ? (
          <View>
            <DateHeader date={formattedDate} />
            <Text style={styles.noDataText}>
              {remind}
            </Text>
          </View>
        )
        : (
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('EntryDetail', { entryId: key })}
          >
            <MetricCard date={formattedDate} metrics={metrics} />
          </TouchableOpacity>
        )}
    </View>
  )

  renderEmptyDate = formattedDate => (
    <View style={styles.item}>
      <DateHeader date={formattedDate} />
      <Text style={styles.noDataText}>
        You didn't log any data on this day.
      </Text>
    </View>
  );

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TopStatusBar />
        <Spinner
          visible={this.state.spinner}
          textContent="Loading..."
        />
        <UdacifitnessCalendar
          items={this.props.entries}
          renderItem={this.renderItem}
          renderEmptyDate={this.renderEmptyDate}
        />
      </View>

    );
  }
}

export default connect(entries => ({ entries }))(History);
