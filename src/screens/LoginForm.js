import React, { Component } from 'react';
import { View ,Text , TouchableOpacity ,  ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from '../components/common';
import {  Actions } from 'react-native-router-flux';

class LoginForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }
  onSignUp(){
    Actions.registr();
  }
  onResetPress(){
    Actions.resetPassword();
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>

        <TouchableOpacity onPress={ this.onResetPress.bind(this)}>
          <Text style={styles.TextStyle}>forget password ?</Text>
        </TouchableOpacity>
        <Text style={styles.TextStyle}>or</Text>

        <CardSection style={styles.cardSectionStyle}>
          <Button onPress={this.onSignUp.bind(this)}>
            Create New Account
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  container:{
    flex:1,
    backgroundColor:'#fff',
 },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  TextStyle:{
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 16,
    alignSelf: 'center',
    color: 'blue'
  },
  cardStyle : {
    borderRadius: 10,
  },
  cardSectionStyle : {
    paddingBottom: 10,
  }

};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
})(LoginForm);
