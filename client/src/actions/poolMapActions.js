import axios from "axios";
import * as actions from "./types";

export const getPoolMaps = () => (dispatch) => {
  dispatch(setPoolMapsLoading());
  axios.get("/api/pool-maps").then((res) =>
    dispatch({
      type: actions.GET_POOL_MAPS,
      payload: {
        poolMaps: res.data,
      },
    })
  );
};

export const addPoolMap = (poolMap) => (dispatch) => {
  axios.post("/api/pool-maps", poolMap).then((res) =>
    dispatch({
      type: actions.ADD_POOL_MAP,
      payload: {
        poolMap: res.data,
      },
    })
  );
};

export const updatePoolMap = (poolMap) => (dispatch) => {
  axios.put(`/api/pool-maps/${poolMap._id}`, poolMap).then((res) => {
    dispatch({
      type: actions.UPDATE_POOL_MAP,
      payload: {
        poolMap: poolMap,
      },
    });
  });
};

export const deletePoolMap = (id) => (dispatch) => {
  axios.delete(`/api/pool-maps/${id}`).then((res) =>
    dispatch({
      type: actions.DELETE_POOL_MAP,
      payload: {
        id: id,
      },
    })
  );
};

export const setPoolMapsLoading = () => {
  return {
    type: actions.POOL_MAPS_LOADING,
  };
};
