import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';

import ListItem from './ListItem';
import Separator from './Separator';

export default ({ items }) => (
  <FlatList
    data={items}
    renderItem={({ item }) => <ListItem item={item} />}
    keyExtractor={item => item.id}
    ItemSeparatorComponent={() => <Separator />}
  />
);
