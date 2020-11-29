import axios from "axios";
import * as actions from "./types";

export const getWells = () => (dispatch) => {
  dispatch(setWellsLoading());
  axios.get("/api/wells").then((res) =>
    dispatch({
      type: actions.GET_WELLS,
      payload: {
        wells: res.data,
      },
    })
  );
};

export const addWell = (well) => (dispatch) => {
  axios.post("/api/wells", well).then((res) =>
    dispatch({
      type: actions.ADD_WELL,
      payload: {
        well: res.data,
      },
    })
  );
};

export const updateWell = (well) => (dispatch) => {
  axios.put(`/api/wells/${well._id}`, well).then((res) => {
    dispatch({
      type: actions.UPDATE_WELL,
      payload: {
        well: well,
      },
    });
  });
};

export const deleteWell = (id) => (dispatch) => {
  axios.delete(`/api/wells/${id}`).then((res) =>
    dispatch({
      type: actions.DELETE_WELL,
      payload: {
        id: id,
      },
    })
  );
};

export const setWellsLoading = () => {
  return {
    type: actions.WELLS_LOADING,
  };
};
