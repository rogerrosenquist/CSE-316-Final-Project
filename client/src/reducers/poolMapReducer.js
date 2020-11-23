import * as actions from "../actions/types";

const initialState = {
  poolMaps: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.GET_POOL_MAPS:
      return {
        ...state,
        poolMaps: action.payload.poolMaps,
        loading: false,
      };
    case actions.DELETE_POOL_MAP:
      return {
        ...state,
        poolMaps: state.poolMaps.filter(
          (poolMap) => poolMap._id !== action.payload.id
        ),
      };
    case actions.ADD_POOL_MAP:
      return {
        ...state,
        poolMaps: [action.payload.poolMap, ...state.poolMaps],
      };
    case actions.UPDATE_POOL_MAP:
      return {
        ...state,
        poolMaps: state.poolMaps.map((poolMap) =>
          poolMap._id === action.payload.poolMap._id
            ? action.payload.poolMap
            : poolMap
        ),
      };
    case actions.POOL_MAPS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
