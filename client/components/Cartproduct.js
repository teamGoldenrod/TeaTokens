import React, { Fragment as Fr } from "react";
import { Link } from "react-router-dom";
import { removeFromCart } from "../store/cart";
import { connect } from "react-redux";
import {
  HStack,
  GridItem as Gi,
  Text,
  Box,
  Button,
  Image,
} from "@chakra-ui/react";
const Cartproduct = (props) => {
  const { el } = props;
  const handleDelete = async () => {
    await props.removefromCart(el.id);
  };

  return (
    <Fr>
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
            <Link to={`/products/${el.productId}`}>View</Link>
          </Button>
          <Button colorScheme="red" size="xs" onClick={handleDelete}>
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
  );
};

const mapDispatchToProps = (dispatch) => ({
  removefromCart: (id) => dispatch(removeFromCart(id)),
  // removeFromCart: (id) => dispatch(_removeFromCart(id)),
});

export default connect(null, mapDispatchToProps)(Cartproduct);
