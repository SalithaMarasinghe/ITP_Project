import axios from 'axios';

import {
  INQUIRY_LIST_REQUEST,
  INQUIRY_LIST_SUCCESS,
  INQUIRY_LIST_FAIL,
  INQUIRY_DETAILS_REQUEST,
  INQUIRY_DETAILS_SUCCESS,
  INQUIRY_DETAILS_FAIL,
  INQUIRY_CREATE_REQUEST,
  INQUIRY_CREATE_SUCCESS,
  INQUIRY_CREATE_FAIL,
  INQUIRY_UPDATE_REQUEST,
  INQUIRY_UPDATE_SUCCESS,
  INQUIRY_UPDATE_FAIL,
  INQUIRY_DELETE_REQUEST,
  INQUIRY_DELETE_SUCCESS,
  INQUIRY_DELETE_FAIL
} from '../constants/inquiryConstants';


export const listInquiries = () => async (dispatch) => {
  try {
    dispatch({ type: INQUIRY_LIST_REQUEST });

    const { data } = await axios.get('/api/inquiries');

    dispatch({
      type: INQUIRY_LIST_SUCCESS,
      payload: data
    });
  } 
  catch (error) {
    dispatch({
      type: INQUIRY_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};

export const getInquiries = (id) => async (dispatch) => {
  try {
    dispatch({ type: INQUIRY_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/inquiries/${id}`);

    dispatch({
      type: INQUIRY_DETAILS_SUCCESS,
      payload: data
    });
  } 
  catch (error) {
    dispatch({
      type: INQUIRY_DETAILS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};

export const createInquiry = (inquiryData) => async (dispatch, getState) => {
  try {
    dispatch({ type: INQUIRY_CREATE_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.post('/api/inquiries', inquiryData, config);


    dispatch({
      type: INQUIRY_CREATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: INQUIRY_CREATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};

export const updateInquiry = (inquiryData) => async (dispatch, getState) => {
  try {
    dispatch({ type: INQUIRY_UPDATE_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(`/api/inquiries/${inquiryData._id}`, inquiryData, config);

    dispatch({
      type: INQUIRY_UPDATE_SUCCESS,
      payload: data
    });
  } 
  catch (error) {
    dispatch({
      type: INQUIRY_UPDATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};

export const deleteInquiry = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: INQUIRY_DELETE_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.delete(`/api/inquiries/${id}`, config);

    dispatch({ type: INQUIRY_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: INQUIRY_DELETE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};
