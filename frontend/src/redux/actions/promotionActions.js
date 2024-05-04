// promotionActions.js

import axios from 'axios';
import {
  PROMOTION_LIST_REQUEST,
  PROMOTION_LIST_SUCCESS,
  PROMOTION_LIST_FAIL,
  PROMOTION_DETAILS_REQUEST,
  PROMOTION_DETAILS_SUCCESS,
  PROMOTION_DETAILS_FAIL,
  PROMOTION_CREATE_REQUEST,
  PROMOTION_CREATE_SUCCESS,
  PROMOTION_CREATE_FAIL,
  PROMOTION_UPDATE_REQUEST,
  PROMOTION_UPDATE_SUCCESS,
  PROMOTION_UPDATE_FAIL,
  PROMOTION_DELETE_REQUEST,
  PROMOTION_DELETE_SUCCESS,
  PROMOTION_DELETE_FAIL
} from '../constants/promotionConstants';

// List all promotions
export const listPromotions = () => async (dispatch) => {
  try {
    dispatch({ type: PROMOTION_LIST_REQUEST });

    const { data } = await axios.get('/api/promotions');

    dispatch({
      type: PROMOTION_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: PROMOTION_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};

// Get details of a promotion
export const getPromotionDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PROMOTION_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/promotions/${id}`);

    dispatch({
      type: PROMOTION_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: PROMOTION_DETAILS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};

// Create a promotion
export const createPromotion = (promotionData) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROMOTION_CREATE_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.post('/api/promotions', promotionData, config);

    dispatch({
      type: PROMOTION_CREATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: PROMOTION_CREATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};

// Update a promotion
export const updatePromotion = (promotionData) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROMOTION_UPDATE_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(`/api/promotions/${promotionData._id}`, promotionData, config);

    dispatch({
      type: PROMOTION_UPDATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: PROMOTION_UPDATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};

// Delete a promotion
export const deletePromotion = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROMOTION_DELETE_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.delete(`/api/promotions/${id}`, config);

    dispatch({ type: PROMOTION_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: PROMOTION_DELETE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};
