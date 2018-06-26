import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
  AWS,
} from 'amazon-cognito-identity-js'

const poolData = {
  UserPoolId: 'ap-southeast-1_jrwGBOr6i',
  ClientId: '7mo75ukp4gqredrgb20qpe2sd',
}

export default class App extends Component {
  register = () => {
    const userPool = new CognitoUserPool(poolData)
    const attributeList = []

    const dataEmail = {
      Name: 'email',
      Value: 'gianglevan94@gmail.com',
    }

    const dataPhoneNumber = {
      Name: 'phone_number',
      Value: '+84976373594',
    }
    const attributeEmail = new CognitoUserAttribute(dataEmail)
    const attributePhoneNumber = new CognitoUserAttribute(dataPhoneNumber)

    attributeList.push(attributeEmail)
    attributeList.push(attributePhoneNumber)

    userPool.signUp('giang', 'password', attributeList, null, (err, result) => {
      if (err) {
        alert(err.message || JSON.stringify(err))
        return
      }
      const cognitoUser = result.user
      alert('user name is ' + cognitoUser.getUsername())
    })
  }

  confirm = () => {
    const userPool = new CognitoUserPool(poolData)
    const userData = {
      Username: 'giang',
      Pool: userPool,
    }

    const cognitoUser = new CognitoUser(userData)
    cognitoUser.confirmRegistration('923002', true, (err, result) => {
      if (err) {
        alert(err.message || JSON.stringify(err))
        return
      }
      alert('call result: ' + result)
    })
  }

  login = () => {
    const authenticationData = {
      Username: 'giang',
      Password: 'password',
    }
    const authenticationDetails = new AuthenticationDetails(authenticationData)
    const userPool = new CognitoUserPool(poolData)
    const userData = {
      Username: 'giang',
      Pool: userPool,
    }
    const cognitoUser = new CognitoUser(userData)
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: result => {
        const accessToken = result.getAccessToken().getJwtToken()
        //POTENTIAL: Region needs to be set if not already set previously elsewhere.
        // AWS.config.region = 'ap-southeast-1'
        // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        //   IdentityPoolId: 'ap-southeast-1:5d243a4a-9ec0-4124-9343-6bacf5a389ee', // your identity pool id here
        //   Logins: {
        //     // Change the key below according to the specific region your user pool is in.
        //     'cognito-idp.ap-southeast-1.amazonaws.com/ap-southeast-1_jrwGBOr6i': result
        //       .getIdToken()
        //       .getJwtToken(),
        //   },
        // })
        //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
        // AWS.config.credentials.refresh(error => {
        //   if (error) {
        //     console.error(error)
        //   } else {
        //     // Instantiate aws sdk service objects now that the credentials have been updated.
        //     // example: var s3 = new AWS.S3();
        //     console.log('Successfully logged!')
        //   }
        // })
      },

      onFailure: err => {
        console.log(err)
        alert(err.message || JSON.stringify(err))
      },
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <TouchableOpacity onPress={this.register} style={styles.button}>
          <Text>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.confirm} style={styles.button}>
          <Text>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.login} style={styles.button}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    marginBottom: 5,
  },
})
