import axios from "axios";
import { getLocalCart } from "../helper";
// import {me} from './user'

const cartState = {
  cart: [], // {id, title, descr, price, img, qty}
};

// ACTION TYPES
const GOT_CART = "GOT_CART";
const ADD_TO_CART = "ADD_TO_CART";
const ADD_QTY = "ADD_QTY";
const SUB_QTY = "SUB_QTY";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const CLEAR_CART = "CLEAR_CART";
const SET_ORDER_ID = "SET_ORDER_ID";

// ACTION CREATORS
export const _gotCart = (cart) => ({
  type: GOT_CART,
  cart,
});

export const _addToCart = (orderProduct) => ({
  type: ADD_TO_CART,
  orderProduct,
});

// adjust quantity
export const _subtractQty = (orderProduct) => ({
  type: SUB_QTY,
  orderProduct,
});
export const _addQty = (orderProduct) => ({
  type: ADD_QTY,
  orderProduct,
});

export const _removeFromCart = (id) => ({
  type: REMOVE_FROM_CART,
  id,
});

export const _clearCart = () => ({
  type: CLEAR_CART,
});

// THUNK CREATORS
export function getCart() {
  return async (dispatch, getState) => {
    try {
      const token = localStorage.getItem("token");
      let data;
      if (!token) {
        const cartLocal = getLocalCart();
        data = Array.isArray(cartLocal)
          ? [...cartLocal]
          : [...getState().cart.cart];
      } else {
        const { data: dataFetched } = await axios.get(`/api/orders/cart`, {
          headers: { authorization: token },
        });
        data = dataFetched;
      }
      dispatch(_gotCart(data));
    } catch (err) {
      console.error(err);
    }
  };
}

export function removeFromCart(id) {
  return async (dispatch, getState) => {
    // console.log("connected");
    try {
      const token = localStorage.getItem("token");
      let data;
      if (!token) {
        throw new Error("no token");
      } else {
        console.log("connected2");
        const { data: dataFetched } = await axios.delete(
          `/api/orders/cart/${id}`,
          {
            headers: { authorization: token },
          }
        );
        data = dataFetched;
      }
      dispatch(_removeFromCart(id));
    } catch (err) {
      console.error(err);
    }
  };
}

export function increaseQty(orderProduct) {
  return async (dispatch) => {
    try {
      // some logic to increase
      // need to pass id
      // need object with numItems and totalPrice
      const { data } = await axios.put(`/api/orders/cart/${id}`);
      dispatch(_addQty(data));
    } catch (err) {
      console.error(err);
    }
  };
}

export function decreaseQty(user, OrderProduct) {
  return async (dispatch) => {
    try {
      // check if qty is > 0
      // some logic to decrement
      const { data } = await axios.put(`/api/orders/cart`);
      dispatch(_subtractQty(data));
    } catch (err) {
      console.error(err);
    }
  };
}

// REDUCER
const cartReducer = (state = cartState, action) => {
  switch (action.type) {
    case GOT_CART:
      return { ...state, cart: [...action.cart] };

    case ADD_TO_CART:
      if (
        state.cart.some((el) => el.productId === action.orderProduct.productId)
      )
        return state;
      return { cart: [...state.cart, action.orderProduct] };

    // case UPDATE_CART:
    //   return {
    //     ...state,
    //     //   cart: state.cart.map(item => item.id === action.productId.id ? {...item })
    //   };

    case ADD_QTY:
      return {
        ...state,
        cart: state.cart.map((product) =>
          product.id === action.id
            ? { ...product, qty: product.numItems + 1 }
            : product
        ),
      };

    case SUB_QTY:
      return {
        ...state,
        cart: state.cart.map((product) =>
          product.id === action.id
            ? {
                ...product,
                quantity: product.numItems > 2 ? product.numItems - 1 : 1,
              }
            : product
        ),
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => {
          return item.id !== action.id;
        }),
      };

    case CLEAR_CART:
      return { cart: [] };

    case SET_ORDER_ID:
      return {};
    default:
      return state;
  }
};

export default cartReducer;
