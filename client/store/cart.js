import axios from "axios";
import { getLocalCart } from "../helper";
// import {me} from './user'

const cartState = {
  cart: [], // {id, title, descr, price, img, qty}
};

// ACTION TYPES
const GOT_CART = "GOT_CART";
const ADD_TO_CART = "ADD_TO_CART";

const UPDATE_CART = "UPDATE_CART";
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
export const _updateCart = (productId, qty) => ({
  type: UPDATE_CART,
  productId,
  qty,
});

export const _removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  productId,
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

    case UPDATE_CART:
      return {
        ...state,
        //   cart: state.cart.map(item => item.id === action.productId.id ? {...item })
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => {
          item.id !== action.productId.id;
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
