import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  title: {},
});

export default ({
  item: {
    imageUri,
    title,
  }
}) => (
  <View style={styles.container}>
    <Image source={{ uri: imageUri }} style={styles.image}/>
    <Text style={styles.title}>{title}</Text>
  </View>
);
