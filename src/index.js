import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import '~/config/ReactotronConfig';

import CreateNavigator from './routes';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      userChecked: false,
      userLogged: false,
    };
  }

  async componentDidMount() {
    const username = await AsyncStorage.getItem('@githuber:username');
    this.setState({
      userChecked: true,
      userLogged: !!username,
    });
  }

  render() {
    const { userChecked, userLogged } = this.state;

    if (!userChecked) return null;

    const Routes = CreateNavigator(userLogged);

    return <Routes />;
  }
}
