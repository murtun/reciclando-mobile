import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import Modal from 'react-native-modal';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isTablet } from 'react-native-device-detection';
import { logout } from '../../actions/UserActions';
import { changeRole } from '../../actions/RoleActions';
import { openCreatePocketModal } from '../../actions/CreatePocketModalActions';
import editPencil from '../../assets/ic_common/ic_editPencil.png';
import plusSign from '../../assets/ic_common/ic_add.png';
import getUser from '../../selectors/UserSelector';
import getRole from '../../selectors/RoleSelector';
import Platform from '../../helpers/Platform';
import Colors from '../../helpers/Colors';
import CustomButton from '../common/CustomButton';
import icon from '../../assets/images/MapPointIcon.png';
import Logo01 from '../../assets/images/Logo01.png';
import user128 from '../../assets/ic_user/ic_user128.png';
import sideMenuIcon from '../../assets/ic_common/ic_hamburger.png';
import HistoryIconWhite from '../../assets/images/HistoryIconWhite.png';
import strings from '../../localization';
import { Screens } from '../Navigation';
import CreatePocketModal from '../common/CreatePocketModal';
import stylesGather from './styles';
import GatherOverlay from './GatherOverlay';
import MapboxGL from '@mapbox/react-native-mapbox-gl';


Mapbox.setAccessToken('pk.eyJ1IjoicXFtZWxvIiwiYSI6ImNqbWlhOXh2eDAwMHMzcm1tNW1veDNmODYifQ.vOmFAXiikWFJKh3DpmsPDA');

const GatherPointOptionModal = ({ isVisible, onPressActionFst, onPressActionSnd }) =>
  (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onPressActionFst}
      onBackButtonPress={onPressActionFst}
      animationOut="slideOutLeft"
    >
      <View style={stylesGather.modalContainer}>
        <View style={stylesGather.modalTitleContainer}>
          <Text style={stylesGather.modalTitle}>{strings.optionsModalGather}</Text>
        </View>
        <View>
          <CustomButton
            style={stylesGather.buttonModal}
            textStyle={stylesGather.textButton}
            title={strings.changeStateIsle}
            onPress={onPressActionFst}
            icon={editPencil}
          />
          <CustomButton
            style={stylesGather.buttonModal}
            textStyle={stylesGather.textButton}
            title={strings.newPocket}
            onPress={onPressActionSnd}
            icon={plusSign}
          />
        </View>
      </View>
    </Modal>
  );

GatherPointOptionModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onPressActionFst: PropTypes.func.isRequired,
  onPressActionSnd: PropTypes.func.isRequired,
};

class Gather extends Component {
  static navigatorStyle = {
    navBarHidden: false,
    navBarBackgroundColor: Colors.primary,
  };

  static navigatorButtons = {
    leftButtons: [
      {
        icon: Logo01,
        id: 'logo',
        buttonColor: Colors.white,
      },
    ],
    rightButtons: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      landscape: Platform.isLandscape(),
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  state = {
    isModalVisible: false,
  };

  componentDidMount() {
    if (isTablet || this.state.landscape) {
      this.setButtonsTablet(this.props.user);
    } else {
      this.setButtonsPhone();
    }
  }

  onNavigatorEvent(event) {
    switch (event.id) {
      case 'sideMenuIcon':
        this.props.navigator.toggleDrawer({
          side: 'right',
          animated: true,
          to: 'open',
        });
        break;
      default:
        break;
    }
  }

  setButtonsTablet = (name) => {
    this.props.navigator.setButtons({
      rightButtons: [
        {
          id: 'profile',
          component: 'CustomButton',
          passProps: {
            title: name,
            icon: user128,
            style: { color: Colors.white, width: 170 },
            textStyle: { margin: 10 },
            onPress: () =>
              this.props.navigator.push({
                screen: Screens.Profile,
                animationType: 'fade',
                title: strings.profile,
              }),
          },
        },
        {
          id: 'history',
          component: 'CustomButton',
          passProps: {
            title: strings.history,
            icon: HistoryIconWhite,
            style: { color: Colors.white, width: 100 },
          },
        },
      ],
      animated: false,
    });
  };

  setButtonsPhone = () => {
    this.props.navigator.setButtons({
      rightButtons: [
        {
          icon: sideMenuIcon,
          id: 'sideMenuIcon',
          buttonColor: Colors.white,
        },
      ],
      animated: false,
    });
  };

  toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

  toggleCreatePocketModal = () => {
    this.toggleModal();
    this.props.openCreatePocketModal();
  }

  logout = () => {
    this.props.logout();
    this.props.changeRole();
  };

  changeRole = () => this.props.changeRole();

  render() {
    return (
      <View style={stylesGather.mapContainer}>
        <GatherOverlay />
        <CreatePocketModal />
        <GatherPointOptionModal
          isVisible={this.state.isModalVisible}
          onPressActionFst={this.toggleModal}
          onPressActionSnd={this.toggleCreatePocketModal}
        />
        <Mapbox.MapView
          styleURL={Mapbox.StyleURL.Street}
          zoomLevel={15}
          userTrackingMode={Mapbox.UserTrackingModes.FollowWithHeading}
          showUserLocation
          style={stylesGather.mapContainer}
        >
          <MapboxGL.PointAnnotation
            key="pointAnnotation"
            id="pointAnnotation"
            coordinate={[-56.165921, -34.917352]}
            selected={false}
          >
            <TouchableOpacity onPress={this.toggleModal}>
              <Image source={icon} style={stylesGather.trashIcon} />
            </TouchableOpacity>
          </MapboxGL.PointAnnotation>
          <Mapbox.PointAnnotation
            id="pointAnnotation2"
            coordinate={[-56.16574729294116, -34.90461658495409]}
          >
            <TouchableOpacity onPress={this.toggleModal}>
              <Image source={icon} style={stylesGather.trashIcon} />
            </TouchableOpacity>
          </Mapbox.PointAnnotation>
        </Mapbox.MapView>
      </View>
    );
  }
}

Gather.propTypes = {
  user: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  changeRole: PropTypes.func.isRequired,
  openCreatePocketModal: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
};

Gather.defaultProps = {};

const mapStateToProps = state => ({
  user: getUser(state),
  role: getRole(state),
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  changeRole: () => dispatch(changeRole()),
  openCreatePocketModal: () => dispatch(openCreatePocketModal()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Gather);
