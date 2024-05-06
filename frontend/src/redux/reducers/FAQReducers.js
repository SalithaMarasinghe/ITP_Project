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
  
  const initialState = {
    faqs: [],
    loading: false,
    error: null
  };
  
  export const FAQListReducer = (state = initialState, action) => {
    switch (action.type) {
      case FAQ_LIST_REQUEST:
        return {
          ...state,
          loading: true
        };
      case FAQ_LIST_SUCCESS:
        return {
          ...state,
          loading: false,
          faqs: action.payload
        };
      case FAQ_LIST_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export const FAQDetailsReducer = (state = { FAQ: {}, loading: false, error: null }, action) => {
    switch (action.type) {
      case FAQ_DETAILS_REQUEST:
        return {
          ...state,
          loading: true
        };
      case FAQ_DETAILS_SUCCESS:
        return {
          ...state,
          loading: false,
          FAQ: action.payload
        };
      case FAQ_DETAILS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export const FAQCreateReducer = (state = { loading: false, error: null }, action) => {
    switch (action.type) {
      case FAQ_CREATE_REQUEST:
        return {
          ...state,
          loading: true
        };
      case FAQ_CREATE_SUCCESS:
        return {
          ...state,
          loading: false
        };
      case FAQ_CREATE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export const FAQUpdateReducer = (state = { loading: false, error: null }, action) => {
    switch (action.type) {
      case FAQ_UPDATE_REQUEST:
        return {
          ...state,
          loading: true
        };
      case FAQ_UPDATE_SUCCESS:
        return {
          ...state,
          loading: false
        };
      case FAQ_UPDATE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export const FAQDeleteReducer = (state = { loading: false, error: null }, action) => {
    switch (action.type) {
      case FAQ_DELETE_REQUEST:
        return {
          ...state,
          loading: true
        };
      case FAQ_DELETE_SUCCESS:
        return {
          ...state,
          loading: false
        };
      case FAQ_DELETE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  