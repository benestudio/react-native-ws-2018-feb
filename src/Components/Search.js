import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {},
  text: {
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'green',
    padding: 10,
    height: 40,
    borderRadius: 20,
  },
});

export default class Seacrh extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Search for a song:</Text>
        <TextInput style={styles.input} value="Wooow!" />
      </View>
    );
  }
}
