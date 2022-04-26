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
export const _updateCart = (orderProduct, qty) => ({
  type: UPDATE_CART,
  orderProduct,
  qty,
});

export const _removeFromCart = (orderProduct) => ({
  type: REMOVE_FROM_CART,
  orderProduct,
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
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("");
      }
      const { data } = await axios.get(`/api/orders/cart`, {
        headers: { authorization: token },
      });
      dispatch(_gotCart(data));
    } catch (err) {
      console.error(err);
    }
  };
}

export function removeFromCart(orderProduct) {
  return async (dispatch) => {
    try {
      // const token = localStorage.getItem("token");
      // let data;
      // if (!token) {
      //   const cartLocal = JSON.parse(localStorage.getItem("cart"));
      //   // data = Array.isArray(cartLocal)
      //   //   ? [...cartLocal, ...getState().cart.cart]
      //   //   : [...getState().cart.cart];
      // } else {
      const { data } = await axios.delete(
        `/api/orders/cart/${orderProduct.id}`
      );

      dispatch(_removeFromCart(data));
    } catch (err) {
      console.error(err);
    }
  };
}

export function updateCart(orderProduct) {
  return async (dispatch) => {
    const { data } = await axios.put(`/api/cart/${orderProduct.id}`);
    dispatch(_updateCart(orderProduct));
  };
}

// REDUCER
const cartReducer = (state = cartState, action) => {
  switch (action.type) {
    case GOT_CART:
      return { ...state, cart: [...action.cart] };

    // case ADD_TO_CART:
    //   // get the items data from the products array
    //   const item = state.cart.find((prod) => prod.id === action.productId.id);
    //   // check if item is in the cart
    //   const inCart = state.cart.find((item) =>
    //     item.id === action.productId.id ? true : false
    //   );
    //   // if item is in cart, adjust quantity
    //   return {
    //     ...state,
    //     cart: inCart
    //       ? state.cart.map((item) =>
    //           item.id === action.productId.id
    //             ? { ...item, qty: item.qty + 1 }
    //             : item
    //         )
    //       : // else add to cart and set qty to 1
    //         [...state.cart, { ...item, qty: 1 }],
    //   };

    //   return { ...state, cart: [...state.cart, action.productId] };

    case UPDATE_CART:
      return {
        ...state,
        //   cart: state.cart.map(item => item.id === action.productId.id ? {...item })
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((el) => {
          el.productId !== action.orderProduct.productId;
        }),
      };

    case CLEAR_CART:
      return { ...state, cart: [] };

    case SET_ORDER_ID:
      return {};
    default:
      return state;
  }
};

export default cartReducer;
