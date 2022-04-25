import axios from "axios";
// import {me} from './user'

const cartState = {
  cart: [], // {id, title, descr, price, img, qty}
  cartItem: {},
  currentItem: null,
  orderId: null,
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

export const _addToCart = (productId) => ({
  type: ADD_TO_CART,
  productId,
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

export const _setOrderId = (orderId) => ({
  type: SET_ORDER_ID,
  orderId,
});

// THUNK CREATORS
export function getCart() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/cart`);
      dispatch(_gotCart(data));
    } catch (err) {
      console.error(err);
    }
  };
}

export function addToCart(productId) {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`api/cart`);
      dispatch(_addToCart(data));
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
      // get the items data from the products array
      const item = state.cart.find((prod) => prod.id === action.productId.id);
      // check if item is in the cart
      const inCart = state.cart.find((item) =>
        item.id === action.productId.id ? true : false
      );
      // if item is in cart, adjust quantity
      return {
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
              item.id === productId.id ? { ...item, qty: item.qty + 1 } : item
            )
          : // else add to cart and set qty to 1
            [...state.cart, { ...item, qty: 1 }],
      };

    //   return { ...state, cart: [...state.cart, action.productId] };

    case UPDATE_CART:
      return {
          ...state,
          cart: state.cart.map(item => item.id === action.productId.id ? {...item })
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => {
          item.id !== action.productId.id;
        }),
      };

    case CLEAR_CART:
      return {...state, cart: []};

    case SET_ORDER_ID:
      return {};
    default:
      return state;
  }
};

export default cartReducer;
