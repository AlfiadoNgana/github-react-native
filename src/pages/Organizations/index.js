import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, ActivityIndicator, FlatList, Image } from 'react-native';
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

export default class Organizations extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: true,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.loadOrganizations();
  }

  loadOrganizations = async () => {
    this.setState({ refreshing: true });

    const username = await AsyncStorage.getItem('@githuber:username');
    const { data } = await api.get(`/users/${username}/orgs`);

    this.setState({ data, loading: false, refreshing: false });
  };

  static navigationOptions = {
    tabBarIcon: TabIcon,
  };

  renderListItem = ({ item }) => (
    <View style={styles.containerOrgs}>
      <Image style={styles.avatarOrgs} source={{ uri: item.avatar_url }} />
      <Text style={styles.titleOrgs}>{item.login}</Text>
    </View>
  );

  renderList = () => {
    const { data, refreshing } = this.state;

    return (
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadOrganizations}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapperStyle}
        refreshing={refreshing}
      />
    );
  };

  render() {
    const { loading } = this.state;
    return (
      <View style={styles.container}>
        <Header title="Organizacoes" />
        {loading ? (
          <ActivityIndicator style={styles.loading} />
        ) : (
          this.renderList()
        )}
      </View>
    );
  }
}
