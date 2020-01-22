import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
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

  renderListItem = ({ item }) => (
    <View style={styles.containerRepos}>
      <Text style={styles.titleRepos}>{item.full_name}</Text>

      <View style={styles.infoContainerRepos}>
        <View style={styles.infoRepos}>
          <Icon name="star" size={12} style={styles.infoIconRepos} />
          <Text style={styles.infoTextRepos}>{item.stargazers_count}</Text>
        </View>
        <View style={styles.infoRepos}>
          <Icon name="code-fork" size={12} style={styles.infoIconRepos} />
          <Text style={styles.infoTextRepos}>{item.forks_count}</Text>
        </View>
        <View style={styles.infoRepos}>
          <Icon name="eye" size={12} style={styles.infoIconRepos} />
          <Text style={styles.infoTextRepos}>{item.watchers_count}</Text>
        </View>
      </View>
    </View>
  );

  renderList = () => {
    const { data } = this.state;

    return (
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
      />
    );
  };

  render() {
    const { loading } = this.state;
    return (
      <View style={styles.container}>
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
