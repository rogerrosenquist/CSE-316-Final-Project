import axios from "axios";
import * as actions from "./types";

export const getWellTestings = () => (dispatch) => {
  dispatch(setWellTestingsLoading());
  axios.get("/api/well-testings").then((res) =>
    dispatch({
      type: actions.GET_WELL_TESTINGS,
      payload: {
        wellTestings: res.data,
      },
    })
  );
};

export const addWellTesting = (wellTesting) => (dispatch) => {
  console.log(wellTesting);
  axios.post("/api/well-testings", wellTesting).then((res) =>
    dispatch({
      type: actions.ADD_WELL_TESTING,
      payload: {
        wellTesting: res.data,
      },
    })
  );
};

export const updateWellTesting = (wellTesting) => (dispatch) => {
  axios
    .put(`/api/well-testings/${wellTesting._id}`, wellTesting)
    .then((res) => {
      dispatch({
        type: actions.UPDATE_WELL_TESTING,
        payload: {
          wellTesting: wellTesting,
        },
      });
    });
};

export const deleteWellTesting = (id) => (dispatch) => {
  axios.delete(`/api/well-testings/${id}`).then((res) =>
    dispatch({
      type: actions.DELETE_WELL_TESTING,
      payload: {
        id: id,
      },
    })
  );
};

export const setWellTestingsLoading = () => {
  return {
    type: actions.WELL_TESTINGS_LOADING,
  };
};
