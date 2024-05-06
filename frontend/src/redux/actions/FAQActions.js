import axios from 'axios';

import {
  FAQ_LIST_REQUEST,
  FAQ_LIST_SUCCESS,
  FAQ_LIST_FAIL,
  FAQ_DETAILS_REQUEST,
  FAQ_DETAILS_SUCCESS,
  FAQ_DETAILS_FAIL,
  FAQ_CREATE_REQUEST,
  FAQ_CREATE_SUCCESS,
  FAQ_CREATE_FAIL,
  FAQ_UPDATE_REQUEST,
  FAQ_UPDATE_SUCCESS,
  FAQ_UPDATE_FAIL,
  FAQ_DELETE_REQUEST,
  FAQ_DELETE_SUCCESS,
  FAQ_DELETE_FAIL
} from '../constants/FAQConstants';


export const listFAQs = () => async (dispatch) => {
  try {
    dispatch({ type: FAQ_LIST_REQUEST });

    const { data } = await axios.get('/api/faqs');

    dispatch({
      type: FAQ_LIST_SUCCESS,
      payload: data
    });
  } 
  catch (error) {
    dispatch({
      type: FAQ_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};

export const getFAQs = (id) => async (dispatch) => {
  try {
    dispatch({ type: FAQ_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/faqs/${id}`);

    dispatch({
      type: FAQ_DETAILS_SUCCESS,
      payload: data
    });
  } 
  catch (error) {
    dispatch({
      type: FAQ_DETAILS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};

export const createFAQ = (FAQData) => async (dispatch, getState) => {
  try {
    dispatch({ type: FAQ_CREATE_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.post('/api/faqs', FAQData, config);


    dispatch({
      type: FAQ_CREATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: FAQ_CREATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};

export const updateFAQ = (FAQData) => async (dispatch, getState) => {
  try {
    dispatch({ type: FAQ_UPDATE_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(`/api/faqs/${FAQData._id}`, FAQData, config);

    dispatch({
      type: FAQ_UPDATE_SUCCESS,
      payload: data
    });
  } 
  catch (error) {
    dispatch({
      type: FAQ_UPDATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};

export const deleteFAQ = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: FAQ_DELETE_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.delete(`/api/faqs/${id}`, config);

    dispatch({ type: FAQ_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: FAQ_DELETE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};
