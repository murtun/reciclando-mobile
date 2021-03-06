import { StyleSheet } from 'react-native';
import Colors from '../../helpers/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.white,
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: 150,
    width: 150,
    zIndex: 1,
  },
  logoTablet: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: 250,
    width: 250,
    zIndex: 1,
  },
  bottomContainer: {
    flex: 1,
  },
  pickerContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50,
    width: '60%',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: Colors.gray,
  },
  pickerContainerTablet: {
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50,
    width: '50%',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: Colors.gray,
  },
  icon: {
    height: 30,
    width: 30,
    margin: 15,
  },
  picker: {
    justifyContent: 'center',
    width: '70%',
    margin: '5%',
  },
  pickerTablet: {
    justifyContent: 'center',
    width: '70%',
    margin: '5%',
    height: 25,
  },
  activityIndicator: {
    margin: '2%',
  },
  button: {
    alignSelf: 'center',
    width: '60%',
    backgroundColor: Colors.primary,
  },
  buttonTablet: {
    alignSelf: 'center',
    width: '50%',
    backgroundColor: Colors.primary,
  },
  textButton: {
    color: Colors.white,
  },
  textButtonTablet: {
    color: Colors.white,
    fontSize: 30,
  },
});

export default styles;
