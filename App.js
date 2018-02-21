import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Search from './src/Components/Search';
import Listing from './src/Components/Listing';
import searchMock from './src/api/searchMock';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      songs: [],
    };
  }

  async componentDidMount() {
    const newSongs = await searchMock({
      offset: 0,
      limit: 100,
      q: 'Shpongle',
    });

    this.setState({
      songs: newSongs,
    });
  }

  handleSearchChange(text) {
    console.log('search text is', text);
  }

  render() {
    const { songs } = this.state;

    return (
      <View style={styles.container}>
        <Text>Welcome at Bene Studio! Enjoy coding.</Text>
        <Search
          onChange={text => this.handleSearchChange(text)}
        />
        <Listing
          items={songs}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    margin: 10,
    marginTop: 50,
  },
});
