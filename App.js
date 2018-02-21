import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Search from './src/Components/Search';

export default class App extends React.Component {
  handleSearchChange(text) {
    console.log('search text is', text);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome at Bene Studio! Enjoy coding.</Text>
        <Search
          onChange={text => this.handleSearchChange(text)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
