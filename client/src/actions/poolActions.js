import axios from "axios";
import * as actions from "./types";

export const getPools = () => (dispatch) => {
  dispatch(setPoolsLoading());
  axios.get("/api/pools").then((res) =>
    dispatch({
      type: actions.GET_POOLS,
      payload: {
        pools: res.data,
      },
    })
  );
};

export const addPool = (pool) => (dispatch) => {
  axios.post("/api/pools", pool).then((res) =>
    dispatch({
      type: actions.ADD_POOL,
      payload: {
        pool: res.data,
      },
    })
  );
};

export const updatePool = (pool) => (dispatch) => {
  axios.put(`/api/pools/${pool._id}`, pool).then((res) => {
    dispatch({
      type: actions.UPDATE_POOL,
      payload: {
        pool: pool,
      },
    });
  });
};

export const deletePool = (id) => (dispatch) => {
  axios.delete(`/api/pools/${id}`).then((res) =>
    dispatch({
      type: actions.DELETE_POOL,
      payload: {
        id: id,
      },
    })
  );
};

export const setPoolsLoading = () => {
  return {
    type: actions.POOLS_LOADING,
  };
};
