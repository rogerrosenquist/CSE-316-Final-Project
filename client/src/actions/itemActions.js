/**
 * THIS FILE IS FOR TESTING PURPOSES ONLY
 */

import axios from "axios";
import * as actions from "./types";

export const getItems = () => (dispatch) => {
  dispatch(setItemsLoading());
  axios.get("/api/items").then((res) =>
    dispatch({
      type: actions.GET_ITEMS,
      payload: {
        data: res.data,
      },
    })
  );
};

export const addItem = (item) => (dispatch) => {
  axios.post("/api/items", item).then((res) =>
    dispatch({
      type: actions.ADD_ITEM,
      payload: {
        item: res.data,
      },
    })
  );
};

export const deleteItem = (id) => (dispatch) => {
  axios.delete(`/api/items/${id}`).then((res) =>
    dispatch({
      type: actions.DELETE_ITEM,
      payload: {
        id: id,
      },
    })
  );
};

export const setItemsLoading = () => {
  return {
    type: actions.ITEMS_LOADING,
  };
};
