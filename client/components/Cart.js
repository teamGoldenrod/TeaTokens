import React, { Fragment as Fr } from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { buttonStyle } from "../styles";
import history from "../history";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { getCart } from "../store/cart";
import {
  Heading,
  Grid,
  GridItem as Gi,
  HStack,
  Box,
  Spacer,
  Center,
} from "@chakra-ui/react";
import Cartproduct from "./Cartproduct";

class Cart extends React.Component {
  constructor() {
    super();
    this.getSubTotal = this.getSubTotal.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this);
  }

  componentDidMount() {
    this.props.getCart();
  }
  getSubTotal() {
    return this.props.cart.reduce(
      (cur, el) => Math.round((cur + el.totalPrice) * 1e12) / 1e12,
      0
    );
  }
  handleCheckout() {
    //this still needs more stuff
    //currently just validating if there is a user logged in
  }
  render() {
    return (
      <Fr>
        <HStack mb={4}>
          <Heading textTransform="uppercase" color="tea.brown">
            Your cart
          </Heading>
          <Spacer />
          {!!this.props.cart.length && (
            <Box
              as="button"
              {...buttonStyle("outline")}
              fontSize="xl"
              fontWeight="bold"
              textTransform="uppercase"
            >
              Checkout
            </Box>
          )}
        </HStack>
        <Grid
          templateColumns="65% repeat(3,1fr)"
          fontSize="lg"
          alignItems="center"
          gap={3}
          pb={12}
        >
          {!!this.props.cart.length ? (
            <Fr>
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

              {this.props.cart.map((el, i) => (
                <Cartproduct key={el.productId} el={el} localId={i + 1} />
              ))}
              <Gi gridColumn="1 / span 3">Subtotal:</Gi>
              <Gi fontWeight="bold">${this.getSubTotal()}</Gi>
            </Fr>
          ) : (
            <Gi gridColumn="1 / -1" as={Center} p={4} flexDir="column">
              <Heading mb={5}>Your shopping cart is empty</Heading>
              <Box
                {...buttonStyle()}
                as="button"
                fontSize="2xl"
                textTransform="uppercase"
              >
                <Link to="/products">Continue Shopping</Link>
              </Box>
            </Gi>
          )}
        </Grid>
      </Fr>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCart: () => dispatch(getCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
