import * as actions from "../actions/types";

const initialState = {
  wells: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.GET_WELLS:
      return {
        ...state,
        wells: action.payload.wells,
        loading: false,
      };
    case actions.DELETE_WELL:
      return {
        ...state,
        wells: state.wells.filter((well) => well._id !== action.payload.id),
      };
    case actions.ADD_WELL:
      return {
        ...state,
        wells: [action.payload.well, ...state.wells],
      };
    case actions.UPDATE_WELL:
      return {
        ...state,
        wells: state.wells.map((well) =>
          well._id === action.payload.well._id ? action.payload.well : well
        ),
      };
    case actions.WELLS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
