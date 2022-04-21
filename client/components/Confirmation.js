import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Confirmation = () => {
  return (
    <div>
      <h1>Thank You for Your Order!</h1>

      <Link to="/home">
        <button type="button">Home</button>
      </Link>
    </div>
  );
};

export default Confirmation;
