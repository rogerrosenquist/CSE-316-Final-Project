import * as actions from "../actions/types";

const initialState = {
  wellTestings: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.GET_WELL_TESTINGS:
      return {
        ...state,
        wellTestings: action.payload.wellTestings,
        loading: false,
      };
    case actions.DELETE_WELL_TESTING:
      return {
        ...state,
        wellTestings: state.wellTestings.filter(
          (wellTesting) => wellTesting._id !== action.payload.id
        ),
      };
    case actions.ADD_WELL_TESTING:
      console.log(action.payload);
      return {
        ...state,
        wellTestings: [action.payload.wellTesting, ...state.wellTestings],
      };
    case actions.UPDATE_WELL_TESTING:
      return {
        ...state,
        wellTestings: state.wellTestings.map((wellTesting) =>
          wellTesting._id === action.payload.wellTesting._id
            ? action.payload.wellTesting
            : wellTesting
        ),
      };
    case actions.WELL_TESTINGS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
