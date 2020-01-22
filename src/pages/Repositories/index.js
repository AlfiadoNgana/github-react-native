import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import api from '~/services/api';
import Header from '~/components/Header';

import styles from './styles';

const TabIcon = ({ tintColor }) => (
  <Icon name="building" size={20} color={tintColor} />
);
TabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

export default class Repositories extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const username = await AsyncStorage.getItem('@githuber:username');
    const { data } = await api.get(`/users/${username}/repos`);

    this.setState({ data, loading: false });
  }

  static navigationOptions = {
    tabBarIcon: TabIcon,
  };

  renderList = () => <Text>Lista</Text>;

  render() {
    const { loading } = this.state;
    return (
      <View>
        <Header title="Repositories" />
        {loading ? (
          <ActivityIndicator style={styles.loading} />
        ) : (
          this.renderList()
        )}
      </View>
    );
  }
}
