import React, { Component } from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'react-native-elements';
import PhoneBale from './PhoneBale';

const list = [
  {
    id: '15488',
  },
  {
    id: '6848878',
  },
  {
    id: '15488',
  },
  {
    id: '6848878',
  },
  {
    id: '15488',
  },
  {
    id: '6848878',
  },
];
class Bale extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  };

  render() {
    return (
      <List containerStyle={{ marginBottom: 0 }}>
        <FlatList data={list} renderItem={({ item }) => <PhoneBale id={item.id} />} />
      </List>
    );
  }
}

Bale.propTypes = {};

Bale.defaultProps = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Bale);