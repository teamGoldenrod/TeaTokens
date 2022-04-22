import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, ButtonGroup } from "@chakra-ui/react";

const Confirmation = () => {
  return (
    <div>
      <h1>Thank You for Your Order!</h1>
      <br />
      <Link to="/home">
        <Button colorScheme="teal">Home</Button>
      </Link>
    </div>
  );
};

export default Confirmation;
