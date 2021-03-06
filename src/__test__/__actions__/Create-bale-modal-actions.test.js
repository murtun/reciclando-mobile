import configureStore from 'redux-mock-store'; // ES6 modules
import thunk from 'redux-thunk';
import * as createBaleModalActions from '../../actions/CreateBaleModalActions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock(
  'react-native-localization',
  () =>
    class RNLocalization {
      language = 'en';

      constructor(props) {
        this.props = props;
        this.setLanguage(this.language);
      }

      setLanguage(interfaceLanguage) {
        this.language = interfaceLanguage;
      }
    },
);

describe('createBaleModalActions', () => {
  afterEach(() => {
    store.clearActions();
  });

  const store = mockStore();

  it('should create an action for open create bale modal', () => {
    const expectedAction = [
      {
        type: createBaleModalActions.actionTypes.CREATE_BALE_REQUEST,
      },
      {
        type: createBaleModalActions.actionTypes.OPEN_CREATE_BALE_MODAL,
      },
    ];

    // Dispatch the action
    store.dispatch(createBaleModalActions.openCreateBaleModal());

    // Test if the store dispatched the expected actions
    const actions = store.getActions();
    expect(actions).toEqual(expectedAction);
  });

  it('should create an action for close create bale modal', () => {
    const expectedAction = {
      type: createBaleModalActions.actionTypes.CLOSE_CREATE_BALE_MODAL,
    };

    // Dispatch the action
    store.dispatch(createBaleModalActions.closeCreateBaleModal());

    // Test if the store dispatched the expected actions
    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });
});
