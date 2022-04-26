import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Cartproducts from "./Cartproducts";
import history from "../history";
<<<<<<< Updated upstream
import { getCart, addCartItem, deleteCartItem, clearCart } from "../store/cart";
=======
import { getCart, removeFromCart } from "../store/cart";
import {
  Heading,
  Grid,
  GridItem as Gi,
  Image,
  HStack,
  Text,
  Button,
  Box,
} from "@chakra-ui/react";
>>>>>>> Stashed changes

class Cart extends React.Component {
  constructor() {
    super();
    // this.getCart = this.getCart.bind(this);
  }

  componentDidMount() {
    this.props.getCart();
  }

  render() {
<<<<<<< Updated upstream
    return <div>goodnight world</div>;
  }
}
=======
    return (
      <Fr>
        <Heading mb={4}>Your cart</Heading>
        <Grid
          templateColumns="65% repeat(3,1fr)"
          fontSize="lg"
          alignItems="center"
          gap={3}
          pb={12}
        >
          <Gi>Product</Gi>
          <Gi>Price</Gi>
          <Gi>Quantity</Gi>
          <Gi>Total</Gi>
          <Gi
            gridColumn="1 / -1"
            borderBottom="1px solid"
            borderColor="blackAlpha.500"
            height={1}
            width="100%"
          ></Gi>

          {this.props.cart.map((el) => (
            <Fr key={el.productId}>
              <Gi as={HStack}>
                <Image
                  src={el.product.imageUrl}
                  alt="tea image"
                  boxSize="100px"
                  objectFit="cover"
                />
                <Box>
                  <Text fontWeight="bold" color="tea.green">
                    {el.product.name}
                  </Text>
                  <Button colorScheme="green" size="xs" mr="2">
                    <Link to={`/products/${el.productId}`}>Check</Link>
                  </Button>
                  <Button
                    colorScheme="red"
                    size="xs"
                    onClick={() => {
                      // console.log(this.props.cart);
                      this.props.removeFromCart(el.productId);
                    }}
                  >
                    Remove
                  </Button>
                </Box>
              </Gi>
              <Gi>${el.product.price}</Gi>
              <Gi>
                <Button size="sm" borderRadius="full" mr="1">
                  -
                </Button>
                {el.numItems}
                <Button size="sm" borderRadius="full" ml="1">
                  +
                </Button>
              </Gi>
              <Gi>${el.totalPrice}</Gi>
              <Gi
                gridColumn="1 / -1"
                borderBottom="1px dotted"
                borderColor="blackAlpha.500"
                height={1}
                width="100%"
              ></Gi>
            </Fr>
          ))}
          <Gi gridColumn="1 / span 3">Subtotal:</Gi>
          <Gi fontWeight="bold">${this.getSubTotal()}</Gi>
        </Grid>
      </Fr>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCart: () => dispatch(getCart()),
    removeFromCart: (productId) => dispatch(removeFromCart(productId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
>>>>>>> Stashed changes

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
