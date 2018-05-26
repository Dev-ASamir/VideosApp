import React from 'react';
//import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import LoginForm from './LoginForm';
import Favorite from './Favorite';

const window = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';

//<Text style={styles.name}>Your name</Text>

export default function Menu({ onItemSelected }) {
  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
          <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{ uri }}
        />
        
      </View>
      <Text
         onPress={ ()=> Actions.favoriteList() }
        style={styles.item}
      >
        My Playlist
      </Text>

      <Text
        onPress={() => {
          firebase.auth().signOut()
          Actions.login({ type: 'reset' });}}
        style={styles.item}
      >
        Log Out
      </Text>
    </ScrollView>
  );
}



const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: 'white',
    padding: 20,
    opacity: 0.75
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
  },
});


