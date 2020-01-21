import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import api from '~/services/api';
import styles from './styles';

export default class Welcome extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
    };
  }

  saveUser = async username => {
    await AsyncStorage.setItem('@githuber:username', username);
  };

  checkUserExists = async username => {
    const user = await api.get(`/users/${username}`);

    return user;
  };

  signIn = async () => {
    const { username } = this.state;
    const { navigation } = this.props;

    try {
      await this.checkUserExists(username);
      await this.saveUser(username);
      navigation.navigate('Repositories');
    } catch (error) {
      console.tron.log(error);
    }
  };

  render() {
    const { username } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bem-Vindo</Text>
        <Text style={styles.text}>
          Para continuar precisamos que informe o seu usuario do github
        </Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite seu Usuario"
            underlineColorAndroid="transparent"
            value={username}
            onChangeText={text => this.setState({ username: text })}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={this.signIn}>
          <Text style={styles.buttonText}>Prosseguir</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
