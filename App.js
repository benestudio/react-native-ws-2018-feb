import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Search from './src/Components/Search';
import Listing from './src/Components/Listing';
import searchMock from './src/api/searchMock';

const PAGE = 20;

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      songs: [],
      offset: 0,
      query: 'Shpongle',
      isFetching: false,
    };
  }

  async loadNextPage() {
    const { songs, offset, query } = this.state;

    this.setState({ isFetching: true });

    const newSongs = await searchMock({
      offset: offset,
      limit: PAGE,
      q: query,
    });

    this.setState({
      isFetching: false,
      songs: [...songs, ...newSongs],
      offset: offset + PAGE,
    });
  }

  async componentDidMount() {
    await this.loadNextPage();
  }

  handleSearchChange(text) {
    console.log('search text is', text);
  }

  async handleEndReached() {
    await this.loadNextPage();    
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
          onEndReached={() => this.handleEndReached()}
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
