import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';

export default ({ items }) => (
  <FlatList
    data={items}
    renderItem={({ item }) => <Text>{item.title}</Text>}
    keyExtractor={item => item.id}
  />
);
