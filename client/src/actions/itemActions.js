/**
 * THIS FILE IS FOR TESTING PURPOSES ONLY
 */

import * as actions from "./types";

export const getItems = () => {
  return {
    type: actions.GET_ITEMS,
  };
};

export const deleteItem = (id) => {
  return {
    type: actions.DELETE_ITEM,
    payload: {
      id: id,
    },
  };
};
