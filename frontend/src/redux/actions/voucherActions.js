import * as actions from "../constants/voucherConstants";
import axios from "axios";
import { logout } from "./userActions";

export const listVoucher =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: actions.VOUCHER_LIST_REQUEST });

      const { data } = await axios.get(
        `/api/vouchers?keyword=${keyword}&pageNumber=${pageNumber}`
      );

      dispatch({ type: actions.VOUCHER_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: actions.VOUCHER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listVoucherDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.VOUCHER_DETAILS_RESET });
    dispatch({ type: actions.VOUCHER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/vouchers/${id}`);

    dispatch({ type: actions.VOUCHER_DETAILS_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({
      type: actions.VOUCHER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteVoucher = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.VOUCHER_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/vouchers/${id}`, config);

    dispatch({ type: actions.VOUCHER_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "not authorized, no token") {
      dispatch(logout());
    }
    dispatch({
      type: actions.VOUCHER_DELETE_FAIL,
      payload: message,
    });
  }
};

export const createVoucher = (dataVoucher) => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.VOUCHER_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/api/vouchers`, dataVoucher, config);

    dispatch({ type: actions.VOUCHER_CREATE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "not authorized, no token") {
      dispatch(logout());
    }
    dispatch({
      type: actions.VOUCHER_CREATE_FAIL,
      payload: message,
    });
  }
};

export const updateVoucher = (dataVoucher) => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.VOUCHER_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/vouchers/${dataVoucher._id}`, dataVoucher, config);

    dispatch({ type: actions.VOUCHER_UPDATE_SUCCESS });
    dispatch({ type: actions.VOUCHER_UPDATE_RESET });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "not authorized, no token") {
      dispatch(logout());
    }
    dispatch({
      type: actions.VOUCHER_UPDATE_FAIL,
      payload: message,
    });
  }
};



