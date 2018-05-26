
// libraries for make component
import React, { Component } from 'react';
import { Text, View } from 'react-native';

// make component
const CardSection = (props) => {

  return (
    <View style={[styles.containerStyle , props.style]}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    padding: 5,
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
  }
};


export  {CardSection};
