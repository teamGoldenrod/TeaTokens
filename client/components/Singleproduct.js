import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getProduct } from "../store/product";

import ProductToCartBtn from "./ProductToCartBtn";
import {
  Grid,
  GridItem as Gi,
  Image,
  Heading,
  Text,
  Box,
} from "@chakra-ui/react";

const SingleProduct = (props) => {
  useEffect(() => {
    props.getProduct(props.match.params.productId);
  }, []);

  const { product } = props;
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
        <ProductToCartBtn
          py="0.6rem"
          px="1rem"
          justifySelf="start"
          alignSelf="start"
          fontSize="xl"
          product={product}
        />
      </Gi>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    product: state.product.singleProduct,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProduct: (id) => dispatch(getProduct(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
