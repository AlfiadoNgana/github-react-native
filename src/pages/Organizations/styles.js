import { StyleSheet } from 'react-native';

import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lighter,
  },
  loading: {
    marginTop: metrics.baseMargin * 2,
  },
  containerOrgs: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    padding: metrics.basePadding,
    marginTop: metrics.baseMargin,
    alignItems: 'center',
    maxWidth: (metrics.screenWidth - 60) / 2,
  },
  avatarOrgs: {
    width: 50,
    height: 50,
  },
  titleOrgs: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.darker,
    marginTop: metrics.baseMargin,
  },
  columnWrapperStyle: {
    marginHorizontal: metrics.baseMargin * 2,
    justifyContent: 'space-between',
  },
});

export default styles;
