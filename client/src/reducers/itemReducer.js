/**
 * THIS FILE IS FOR TESTING PURPOSES ONLY
 */

import { v4 as uuid } from "uuid";
import * as actions from "../actions/types";

const initialState = {
  items: [
    { id: uuid(), name: "amethyst" },
    { id: uuid(), name: "jasper" },
    { id: uuid(), name: "agate" },
    { id: uuid(), name: "chalcedony" },
  ],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.GET_ITEMS:
      return {
        ...state,
      };
    case actions.DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    case actions.ADD_ITEM:
      return {
        ...state,
        items: [action.payload.item, ...state.items],
      };
    default:
      return state;
  }
}
