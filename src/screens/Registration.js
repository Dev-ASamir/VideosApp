
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { nameCreated, emailCreated, passwordCreated, signedIn } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from '../components/common';

class Registration extends Component {

    createName(text) {
        this.props.nameCreated(text);
    }

    createEmail(text) {
        this.props.emailCreated(text);
    }

    createPassword(text) {
        this.props.passwordCreated(text);
    }

    onSignUpPress() {
        const { email, password, name } = this.props;
        this.props.signedIn({ email, password, name })

    }

    renderRegister() {
        if (this.props.loading) {
            return <Spinner size="large" />;
        }

        return (
            <Button onPress={this.onSignUpPress.bind(this)}>
                Registr
            </Button>
        );
    }

    render() {
        return (
            <ImageBackground style={styles.container} source={require('../images/bg.jpg')} >
                <Card>

                    <CardSection>
                        <Input
                            label="Name"
                            placeholder="Jane"
                            value={this.props.name}
                            onChangeText={this.createName.bind(this)}
                        />
                    </CardSection>

                    <CardSection>
                        <Input
                            label="Email"
                            placeholder="email@gmail.com"
                            onChangeText={this.createEmail.bind(this)}
                            value={this.props.email}
                        />
                    </CardSection>

                    <CardSection>
                        <Input
                            secureTextEntry
                            label="Password"
                            placeholder="password"
                            onChangeText={this.createPassword.bind(this)}
                            value={this.props.password}
                        />
                    </CardSection>

                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>

                    <CardSection>
                        {this.renderRegister()}
                    </CardSection>

                </Card>
            </ImageBackground>
        )
    }


}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    container:{
        flex:1,
       // justifyContent:'center',
        backgroundColor:'#fff',
      //  alignItems:'center'
     },
};


const mapStateToProps = ({ userdata }) => {
    const { name, email, password, error, loading } = userdata;

    return { name, email, password, error, loading };
};

export default connect(mapStateToProps, {
    nameCreated, emailCreated, passwordCreated, signedIn
})(Registration);