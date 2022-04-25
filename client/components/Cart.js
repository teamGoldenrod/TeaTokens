import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Cartproducts from "./Cartproducts";
import history from "../history";
import { getCart, addCartItem, deleteCartItem, clearCart } from "../store/cart";

class Cart extends React.Component {
  constructor() {
    super();
    // this.getCart = this.getCart.bind(this);
  }

  componentDidMount() {
    this.props.getCart();
  }

  render() {
    return <div>goodnight world</div>;
  }
}

//   constructor() {
//     super();
//     this.checkout = this.checkout.bind(this);
//     this.total = this.total.bind(this);
//     this.totalItems = this.totalItems.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//   }

//   componentDidMount() {
//     this.props.getProducts();
//   }

//   handleSubmit() {
//     this.props.checkOut();
//   }

//   handleChange(event) {
//     this.setState({
//       Entry: event.target.value,
//     });
//   }

//   async checkout() {
//     const order = this.props.cart;

//     const boughtOrder = await Axios.post(`/api/orders/checkout/${order.id}`, {
//       total: this.total(true),
//     });
//     const userInfo = await Axios.get(`/api/users/${boughtOrder.data.userId}`);
//     localStorage.setItem("completedCart", JSON.stringify(boughtOrder.data));
//     localStorage.setItem("userInfo", JSON.stringify(userInfo));
//     this.props.clearCart();
//     history.push(`/checkout/${boughtOrder.data.id}`);
//   }

//   total(db) {
//     let total = 0;
//     const items = this.props.cart.order_items;
//     if (!items.length) return 0;
//     for (let i = 0; i < items.length; i++) {
//       let currentProduct = items[i].product;
//       let productPrice = currentProduct.price * items[i].amount;
//       total += productPrice;
//     }
//   }
//   totalItems() {
//     let total = 0;
//     const items = this.props.cart.order_items;
//     for (let i = 0; i < items.length; i++) {
//       total += Number(items[i].amount);
//     }
//     return total;
//   }

//   render() {
//     return (
//       <div className="cart-component-container">
//         <div className="attributes">
//           <h4>Shopping Cart</h4>
//           <h3>Name</h3>
//           <h3>Price</h3>
//           <h3>Quantity</h3>
//           <div />
//         </div>
//         {this.props.cart.order_items.length !== 0 ? (
//           this.props.cart.order_items.map((current) => {
//             return (
//               <Cartitem
//                 key={current.product.id}
//                 current={current}
//                 remove={this.props.deleteCartItem}
//                 addItem={this.props.addCartItem}
//               />
//             );
//           })
//         ) : (
//           <div id="empty-cart">
//             <p>Cart is Empty</p>
//           </div>
//         )}

//         <div className="checkout-container">
//           <h3>TOTAL ITEMS: {this.totalItems()} </h3>
//           <h3>TOTAL: {this.total() / 100} USD </h3>
//         </div>

//         {this.props.user.id ? (
//           <Checkout
//             name="Checkout"
//             description="Luxury Tea"
//             amount={this.total() / 100}
//             checkout={this.checkout}
//           />
//         ) : (
//           <Link to="/login">
//             <h3 className="cart_login">Log in to Checkout</h3>
//           </Link>
//         )}
//       </div>
//     );
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     deleteCartItem: (orderId, productId) =>
//       dispatch(deleteCartItem(orderId, productId)),
//     addCartItem: (orderId, productId, qty) =>
//       dispatch(addCartItem(orderId, productId, qty)),
//     clearCart: () => dispatch(clearCart()),
//   };
// };

const mapStateToProps = (state) => {
  return {
    user: state.user,
    cart: state.cart,
  };
};

export default connect(mapStateToProps, { getCart })(Cart);
