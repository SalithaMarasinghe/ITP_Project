import * as actions from "../constants/orderConstants";
import axios from "axios";
import { logout } from "./userActions";
import CartAPI from "../../api/CartAPI";

export const createOrder = (dataOrder) => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.ORDER_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/orders", dataOrder, config);

    dispatch({ type: actions.ORDER_CREATE_SUCCESS, payload: data.order });
    // clear cart after order is created
    await CartAPI.clearCart();
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "not authorized, no token") {
      dispatch(logout());
    }
    dispatch({
      type: actions.ORDER_CREATE_FAILED,
      payload: message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.ORDER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({ type: actions.ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "not authorized, no token") {
      dispatch(logout());
    }
    dispatch({
      type: actions.ORDER_DETAILS_FAILED,
      payload: message,
    });
  }
};

export const deliverOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.ORDER_DELIVER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/orders/${orderId}/deliver`, {}, config);

    dispatch({ type: actions.ORDER_DELIVER_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "not authorized, no token") {
      dispatch(logout());
    }
    dispatch({
      type: actions.ORDER_DELIVER_FAILED,
      payload: message,
    });
  }
};

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.ORDER_LIST_MY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/myorders`, config);

    dispatch({ type: actions.ORDER_LIST_MY_SUCCESS, payload: data.orders });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "not authorized, no token") {
      dispatch(logout());
    }
    dispatch({
      type: actions.ORDER_LIST_MY_FAILED,
      payload: message,
    });
  }
};

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.ORDER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/`, config);
    dispatch({ type: actions.ORDER_LIST_SUCCESS, payload: data.orders });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "not authorized, no token") {
      dispatch(logout());
    }
    dispatch({
      type: actions.ORDER_LIST_FAILED,
      payload: message,
    });
  }
};

export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({ type: actions.ORDER_PAY_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );

      dispatch({ type: actions.ORDER_PAY_SUCCESS, payload: data.order });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "not authorized, no token") {
        dispatch(logout());
      }
      dispatch({
        type: actions.ORDER_PAY_FAILED,
        payload: message,
      });
    }
  };

// Add additional action to update order payment status to "Paid" after bank transfer details are submitted
export const updateBank = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.ORDER_UPDATE_TO_PAID_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/orders/${order._id}/paybank`,
      order,
      config
    );

    dispatch({
      type: actions.ORDER_UPDATE_TO_PAID_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "not authorized, no token") {
      dispatch(logout());
    }
    dispatch({
      type: actions.ORDER_UPDATE_TO_PAID_FAILED,
      payload: message,
    });
  }
};

// Add additional action to update order Delivery status to "Processing" after Delivery details are submitted
export const updateDelivery = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.ORDER_UPDATE_DELIVERY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/orders/${order._id}/deldetails`,
      order,
      config
    );

    dispatch({
      type: actions.ORDER_UPDATE_DELIVERY_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "not authorized, no token") {
      dispatch(logout());
    }
    dispatch({
      type: actions.ORDER_UPDATE_DELIVERY_FAILED,
      payload: message,
    });
  }
};

// Action to delete an order
export const cancelOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.ORDER_CANCEL_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/orders/${orderId}`, config);

    dispatch({ type: actions.ORDER_CANCEL_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "not authorized, no token") {
      dispatch(logout());
    }
    dispatch({
      type: actions.ORDER_CANCEL_FAILED,
      payload: message,
    });
  }
};
