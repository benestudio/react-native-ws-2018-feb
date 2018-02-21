import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
} from 'react-native';

export default class Seacrh extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View>
        <Text>Search for a song:</Text>
        <TextInput value="Wooow!" />
      </View>
    );
  }
}
