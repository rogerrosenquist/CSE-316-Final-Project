/**
 * THIS FILE IS FOR TESTING PURPOSES ONLY
 */

import * as actions from "../actions/types";

const initialState = {
  items: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.GET_ITEMS:
      return {
        ...state,
        items: action.payload.data,
        loading: false,
      };
    case actions.DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload.id),
      };
    case actions.ADD_ITEM:
      return {
        ...state,
        items: [action.payload.item, ...state.items],
      };
    case actions.ITEMS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
