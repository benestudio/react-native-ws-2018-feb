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
    marginBottom: 10,
  },
});

export default class Seacrh extends Component {
  constructor() {
    super();

    this.state = {
      text: '',
    };
  }

  handleChangeText(newText) {
    const { onChange } = this.props;

    this.setState({
      text: newText,
    }, () => {
      onChange && onChange(newText);
    });
  }

  render() {
    const { text } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Search for a song:</Text>
        <TextInput
          style={styles.input}
          value={text}
          placeholder="Search here..."
          onChangeText={newText => this.handleChangeText(newText)}
        />
      </View>
    );
  }
}
