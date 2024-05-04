// promotionReducer.js

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
  
  const initialState = {
    promotions: [],
    loading: false,
    error: null
  };
  
  export const promotionListReducer = (state = initialState, action) => {
    switch (action.type) {
      case PROMOTION_LIST_REQUEST:
        return {
          ...state,
          loading: true
        };
      case PROMOTION_LIST_SUCCESS:
        return {
          ...state,
          loading: false,
          promotions: action.payload
        };
      case PROMOTION_LIST_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export const promotionDetailsReducer = (state = { promotion: {}, loading: false, error: null }, action) => {
    switch (action.type) {
      case PROMOTION_DETAILS_REQUEST:
        return {
          ...state,
          loading: true
        };
      case PROMOTION_DETAILS_SUCCESS:
        return {
          ...state,
          loading: false,
          promotion: action.payload
        };
      case PROMOTION_DETAILS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export const promotionCreateReducer = (state = { loading: false, error: null }, action) => {
    switch (action.type) {
      case PROMOTION_CREATE_REQUEST:
        return {
          ...state,
          loading: true
        };
      case PROMOTION_CREATE_SUCCESS:
        return {
          ...state,
          loading: false
        };
      case PROMOTION_CREATE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export const promotionUpdateReducer = (state = { loading: false, error: null }, action) => {
    switch (action.type) {
      case PROMOTION_UPDATE_REQUEST:
        return {
          ...state,
          loading: true
        };
      case PROMOTION_UPDATE_SUCCESS:
        return {
          ...state,
          loading: false
        };
      case PROMOTION_UPDATE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export const promotionDeleteReducer = (state = { loading: false, error: null }, action) => {
    switch (action.type) {
      case PROMOTION_DELETE_REQUEST:
        return {
          ...state,
          loading: true
        };
      case PROMOTION_DELETE_SUCCESS:
        return {
          ...state,
          loading: false
        };
      case PROMOTION_DELETE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  