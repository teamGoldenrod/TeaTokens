import React from "react";
import { Link } from "react-router-dom";
import {
  GridItem as Gi,
  VStack,
  Image,
  Heading,
  Text,
  Box,
} from "@chakra-ui/react";
import { buttonStyle } from "../styles";
import { addToCart } from "./Helper";

export default function ProductItem({ product }) {
  async function handleAddProduct() {
    console.log("adding");
    await addToCart(product.id);
    console.log("added");
  }

  return (
    <Gi>
      <VStack
        spacing="10px"
        align="start"
        as={Link}
        to={`/products/${product.id}`}
      >
        <Image src={product.imageUrl} alt="tea image" />
        <Heading color="tea.matcha">{product.name}</Heading>
        <Text fontSize="lg">${product.price}</Text>
      </VStack>
      <Box
        as="button"
        {...buttonStyle("outline")}
        marginTop="2"
        onClick={handleAddProduct}
      >
        Add To Cart
      </Box>
    </Gi>
  );
}
