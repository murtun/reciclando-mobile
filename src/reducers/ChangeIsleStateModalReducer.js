import { actionTypes } from '../actions/ChangeIsleStateModalActions';

export const initialState = {
  changeIsleStateModalIsOpen: false,
};

const createBaleModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_CHANGE_ISLE_STATE_MODAL:
      return {
        ...state,
        changeIsleStateModalIsOpen: true,
      };
    case actionTypes.CLOSE_CHANGE_ISLE_STATE_MODAL:
      return initialState;
    default:
      return state;
  }
};

export default createBaleModalReducer;