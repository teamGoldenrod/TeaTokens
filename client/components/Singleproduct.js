import React from "react";
import history from "../history";
import { connect } from "react-redux";
import { getProduct } from "../store/product";
import { addCartItem } from "../store/cart.js";
import { buttonStyle } from "../styles";
import axios from "axios";

import {
  Grid,
  GridItem as Gi,
  Image,
  Heading,
  Text,
  Box,
} from "@chakra-ui/react";

class SingleProduct extends React.Component {
  constructor() {
    super();
    // this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleAddProduct = this.handleAddProduct.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  // async handleAddToCart() {
  //   const item = this.props.product;

  //   if (this.props.user.id) {
  //     this.props.addCartItem(this.props.cart.id, item, 1);
  //   } else {
  //     this.props.addCartItem(0, item, 1);
  //   }
  //   history.push("/cart");
  // }

  componentDidMount() {
    this.props.getProduct(this.props.match.params.productId);
  }

  async handleAddProduct() {
    console.log("adding");
    await this.addToCart(this.props.product.id);
    console.log("added");
  }

  async addToCart(productId) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("");
      }
      await axios.post(
        `/api/orders`,
        { prodId: productId },
        { headers: { authorization: token } }
      );
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const product = this.props.product;
    console.log(product);
    return (
      <Grid templateColumns="repeat(2,1fr)" gap="5rem">
        <Gi>
          <Image src={product.imageUrl} alt="tea image" />
        </Gi>
        <Gi
          as={Grid}
          templateRows="repeat(4,min-content)"
          gap="3rem"
          alignContent="center"
        >
          <Heading fontSize="6xl">{product.name}</Heading>
          <Text lineHeight="8" fontSize="xl">
            {product.description}
          </Text>
          <Text fontSize="4xl">${product.price}</Text>
          <Box
            {...buttonStyle()}
            py="0.6rem"
            px="1rem"
            justifySelf="start"
            alignSelf="start"
            fontSize="xl"
            onClick={this.handleAddProduct}
          >
            Add to cart
          </Box>
        </Gi>
      </Grid>
    );
  }
}
// <div className="single-product-page">
//         hello world
//         <div key={product.id}>
//           <img className="product-img" src={product.imageUrl} />
//         </div>
//         <div className="single-product-page-info">
//           <h3>{product.name}</h3>
//           <img className="product-img" src={product.imageUrl} />
//           <p>{product.description}</p>
//           <p>{product.price} USD</p>
//           {product.inventory > 0 ? (
//             <button onClick={this.handleAddToCart} type="submit">
//               Add To Cart
//             </button>
//           ) : (
//             <h3>Sold Out</h3>
//           )}
//         </div>
//       </div>
const mapStateToProps = (state) => {
  return {
    product: state.product.singleProduct,
    user: state.user,
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProduct: (id) => dispatch(getProduct(id)),
    addCartItem: (id, order) => dispatch(addCartItem(id, order)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
