import React, { Component } from 'react';
import { Text, View, TouchableOpacity , ImageBackground} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { newEmailChanged, Reseted } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from '../components/common';

//export default
class ResetPassword extends Component {


    onEmailChange(text) {
        this.props.newEmailChanged(text);
    }

    onResetPress() {
        const { email } = this.props;
        this.props.Reseted({ email })
    }

    renderButton() {
        if (this.props.loading) {
          return <Spinner size="large" />;
        }
    
        return (
        <Button onPress={this.onResetPress.bind(this)}>
            Reset
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

                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>

                    <CardSection>
                        {this.renderButton()}
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
    container:{
        flex:1,
        backgroundColor:'#fff',
     },

  };

const mapStateToProps = ({ auth }) => {
    const { email, newPassword, error, loading } = auth;
    return { email, newPassword, error, loading };
};

export default connect(mapStateToProps,
    { newEmailChanged, Reseted }
)(ResetPassword);