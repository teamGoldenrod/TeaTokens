import React from "react";
import { Link } from "react-router-dom";
import { GridItem as Gi, VStack, Image, Heading, Text } from "@chakra-ui/react";

import ProductToCartBtn from "./ProductToCartBtn";

export default function ProductItem({ product }) {
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
      <ProductToCartBtn marginTop="2" product={product} btnStyle="outline" />
    </Gi>
  );
}
