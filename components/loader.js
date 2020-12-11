import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { Text } from "galio-framework";
import argonTheme from "../constants/Theme";

const loader = ({loading}) => {
  return (loading ? <ActivityIndicator size="large" color={argonTheme.COLORS.VERDE} style={styles.defaultStyle} /> : <Text></Text>);
}

const styles = StyleSheet.create({
  defaultStyle: {
    marginVertical:50
  }
});

export default loader
