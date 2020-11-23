import * as actions from "../actions/types";

const initialState = {
  pools: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.GET_POOLS:
      return {
        ...state,
        pools: action.payload.pools,
        loading: false,
      };
    case actions.DELETE_POOL:
      return {
        ...state,
        pools: state.pools.filter((pool) => pool._id !== action.payload.id),
      };
    case actions.ADD_POOL:
      return {
        ...state,
        pools: [action.payload.pool, ...state.pools],
      };
    case actions.UPDATE_POOL:
      return {
        ...state,
        pools: state.pools.map((pool) =>
          pool._id === action.payload.pool._id ? action.payload.pool : pool
        ),
      };
    case actions.POOLS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
