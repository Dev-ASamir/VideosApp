
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { nameCreated, emailChanged, passwordChanged, signedIn } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from '../components/common';

class Registration extends Component {

    createName(text) {
        this.props.nameCreated(text);
    }

    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
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
                    {this.renderRegister()}
                </CardSection>

            </Card>
        )
    }


}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
};


const mapStateToProps = ({ auth }) => {
    const { name, email, password, error, loading } = auth;
    return { name, email, password, error, loading };
};

export default connect(mapStateToProps, {
    nameCreated, emailChanged, passwordChanged, signedIn
})(Registration);