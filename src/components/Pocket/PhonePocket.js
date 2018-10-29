import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import PocketIcon from '../../assets/images/PocketIcon.png';
import Button from '../common/Button';
import CustomButton from '../common/CustomButton';
import PencilIcon from '../../assets/ic_common/ic_edit.png';
import PocketInfo from '../Pocket/PocketInfo';
import strings from '../../localization';
import styles from './styles';

const Pocket = ({
  id, pocketState, onPressAction, openEditModal,
}) => (
  <View style={styles.containerPhonePocket}>
    <TouchableOpacity onPress={onPressAction} style={styles.touchableStyle}>
      <Image source={PocketIcon} style={styles.pocketImageStylePhone} />
      <Text style={styles.textBlackPhone}>
        {strings.pocket} #{id}
      </Text>
    </TouchableOpacity>
    <View style={styles.wrapperButtonPhone}>
      <View style={styles.containerButtonPhone}>
        <Button
          style={pocketState === 'Unweighed' ? styles.phoneButton : styles.phoneBlueButton}
          title={
            pocketState === 'Unweighed'
              ? strings.pocketButtonWeightText
              : strings.pocketButtonEditWeightText
          }
          textStyle={styles.tabletButtonText}
        />
      </View>
      <View style={styles.containerEditTablet}>
        <CustomButton icon={PencilIcon} onPress={openEditModal} />
      </View>
    </View>
  </View>
);

Pocket.propTypes = {
  id: PropTypes.string.isRequired,
  pocketState: PropTypes.string.isRequired,
  onPressAction: PropTypes.func.isRequired,
  openEditModal: PropTypes.func.isRequired,
};

class PhonePocket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      time: props.time,
      weight: props.weight,
      pocketState: props.pocketState,
      showingInfo: false,
    };
  }

  toggleInfo = () => this.setState({ showingInfo: !this.state.showingInfo });

  render() {
    if (this.state.showingInfo) {
      return (
        <View>
          <Pocket
            id={this.state.id}
            pocketState={this.state.pocketState}
            onPressAction={this.toggleInfo}
            openEditModal={this.props.openEditModal}
          />
          <PocketInfo
            time={this.state.time}
            weight={this.state.pocketState === 'Unweighed' ? strings.unweighted : this.state.weight}
          />
        </View>
      );
    }
    return (
      <View>
        <Pocket
          id={this.state.id}
          pocketState={this.state.pocketState}
          onPressAction={this.toggleInfo}
          openEditModal={this.props.openEditModal}
        />
      </View>
    );
  }
}

PhonePocket.propTypes = {
  id: PropTypes.string.isRequired,
  time: PropTypes.string,
  weight: PropTypes.string,
  pocketState: PropTypes.string.isRequired,
  openEditModal: PropTypes.func.isRequired,
};

PhonePocket.defaultProps = {
  time: false,
  weight: false,
};

export default PhonePocket;
