import Axios from 'axios'
import {me} from './user'
//ACTION TYPES
const GOT_CART = 'GOT_CART'
const ADDED_CART_ITEM = 'ADDED_CART_ITEM'
const DELETED_CART_ITEM = 'DELETED_CART_ITEM'
const CLEAR_CART = 'CLEAR_CART'

//ACTION CREATORS
const gotCart = cart => ({
  type: GOT_CART,
  cart
})

const addedCartItem = (orderId, product, qty = 1) => ({
  type: ADDED_CART_ITEM,
  orderId,
  product,
  qty
})

const deletedCartItem = productId => ({
  type: DELETED_CART_ITEM,
  productId
})

const clearedCart = () => ({
  type: CLEAR_CART
})




