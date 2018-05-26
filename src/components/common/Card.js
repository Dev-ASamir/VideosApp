// libraries for make component
import React, { Component } from 'react';
import { Text, View } from 'react-native';

// make component
const Card = (props) => {

  return (
    <View style={[styles.containerStyle , props.style]}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    backgroundColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  }
};


export  {Card};