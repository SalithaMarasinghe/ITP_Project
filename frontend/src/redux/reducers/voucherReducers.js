import * as actions from "../constants/voucherConstants";

export const voucherListReducer = (state = { vouchers: [] }, action) => {
  switch (action.type) {
    case actions.VOUCHER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actions.VOUCHER_LIST_SUCCESS:
      console.log(action.payload.vouchers)

      return {
        ...state,
        loading: false,
        voucherList: action.payload.vouchers,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case actions.VOUCHER_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const voucherDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.VOUCHER_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actions.VOUCHER_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case actions.VOUCHER_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const voucherCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.VOUCHER_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actions.VOUCHER_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case actions.VOUCHER_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const voucherUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.VOUCHER_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actions.VOUCHER_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
      };
    case actions.VOUCHER_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actions.VOUCHER_UPDATE_RESET: {
      return {};
    }
    default:
      return state;
  }
};


