import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import getIsModalVisible from '../../selectors/CreateBaleModalSelector';
import { closeCreateBaleModal, newBale } from '../../actions/CreateBaleModalActions';
import strings from '../../localization';
import ErrorView from '../common/ErrorView';
import Button from './Button';
import TextField from './TextField';
import recyclabeleMaterials from './Constants';
import styles from './styles';

class CreateBaleModal extends Component {
  constructor(props) {
    super(props);
    this.materials = recyclabeleMaterials;
  }

  state = {
    selectedMaterial: false,
    newWeight: 0,
    inputError: true,
    errors: [],
  };

  getMaterials() {
    const pickerMaterial = [];
    pickerMaterial.push(<Picker.Item
      key={999}
      label={strings.selectMaterial}
      value={false}
    />);
    this.materials.map((material) => {
      pickerMaterial.push(<Picker.Item
        key={material.id}
        label={material.name}
        value={material.value}
      />);
    });
    return pickerMaterial;
  }

  acceptEdit = () => {
    if (this.state.newWeight > 0) {
      if (this.state.selectedMaterial) {
        this.props.newBale(this.props.token, this.state.newWeight, this.state.selectedMaterial);
      } else {
        this.setState({ inputError: true });
        this.setState({ errors: [strings.invalidInputType] });
      }
    } else {
      this.setState({ inputError: true });
      this.setState({ errors: [strings.invalidInputNumber] });
    }
  };

  closeModal = () => {
    this.setState({ inputError: false });
    this.setState({ newWeight: 0 });
    this.setState({ selectedMaterial: false });
    this.setState({ errors: [] });
    this.props.closeCreateBaleModal();
  };

  render() {
    return (
      <Modal
        isVisible={this.props.isModalVisible}
        onBackButtonPress={this.closeModal}
        onBackdropPress={this.closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>{strings.createBale}</Text>
          </View>
          <View>
            <TextField
              placeholder={strings.weighPlaceholderModal}
              keyboardType="numeric"
              onChangeText={value => this.setState({ newWeight: value })}
            />
            <Picker
              selectedValue={this.state.selectedMaterial}
              mode="dropdown"
              onValueChange={value => this.setState({ selectedMaterial: value })}
            >
              {this.getMaterials()}
            </Picker>
            {this.state.inputError && <ErrorView errors={this.state.errors} />}
            <Button
              style={styles.buttonModal}
              textStyle={styles.text}
              title={strings.acceptModal}
              onPress={this.acceptEdit}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

CreateBaleModal.propTypes = {
  closeCreateBaleModal: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  token: PropTypes.string,
  newBale: PropTypes.func.isRequired,
};

CreateBaleModal.defaultProps = {
  token: false,
};

const mapStateToProps = state => ({
  isModalVisible: getIsModalVisible(state),
  token: state.login.token,
});

const mapDispatchToProps = dispatch => ({
  closeCreateBaleModal: () => dispatch(closeCreateBaleModal()),
  newBale: (token, weight, material) => dispatch(newBale(token, weight, material)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateBaleModal);
