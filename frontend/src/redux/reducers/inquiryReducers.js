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
  
  const initialState = {
    inquiries: [],
    loading: false,
    error: null
  };
  
  export const inquiryListReducer = (state = initialState, action) => {
    switch (action.type) {
      case INQUIRY_LIST_REQUEST:
        return {
          ...state,
          loading: true
        };
      case INQUIRY_LIST_SUCCESS:
        return {
          ...state,
          loading: false,
          inquiries: action.payload
        };
      case INQUIRY_LIST_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export const inquiryDetailsReducer = (state = { inquiry: {}, loading: false, error: null }, action) => {
    switch (action.type) {
      case INQUIRY_DETAILS_REQUEST:
        return {
          ...state,
          loading: true
        };
      case INQUIRY_DETAILS_SUCCESS:
        return {
          ...state,
          loading: false,
          FAQ: action.payload
        };
      case INQUIRY_DETAILS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export const inquiryCreateReducer = (state = { loading: false, error: null }, action) => {
    switch (action.type) {
      case INQUIRY_CREATE_REQUEST:
        return {
          ...state,
          loading: true
        };
      case INQUIRY_CREATE_SUCCESS:
        return {
          ...state,
          loading: false
        };
      case INQUIRY_CREATE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export const inquiryUpdateReducer = (state = { loading: false, error: null }, action) => {
    switch (action.type) {
      case INQUIRY_UPDATE_REQUEST:
        return {
          ...state,
          loading: true
        };
      case INQUIRY_UPDATE_SUCCESS:
        return {
          ...state,
          loading: false
        };
      case INQUIRY_UPDATE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export const inquiryDeleteReducer = (state = { loading: false, error: null }, action) => {
    switch (action.type) {
      case INQUIRY_DELETE_REQUEST:
        return {
          ...state,
          loading: true
        };
      case INQUIRY_DELETE_SUCCESS:
        return {
          ...state,
          loading: false
        };
      case INQUIRY_DELETE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  