import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';

export default ({
  item: {
    imageUri,
    title,
  }
}) => (
  <View>
    <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }}/>
    <Text>{title}</Text>
  </View>
);
