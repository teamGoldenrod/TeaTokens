import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProducts } from "../store/product";

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts();
  }
  render() {
    console.log(this.props.products);
    return (
      <div className="allProducts">
        {this.props.products.map((product) => {
          return (
            <div key={product.id} className="product">
              <Link to={`/products/${product.id}`}>
                <img className="product-img" src={product.imageUrl} />
                <h3>{product.name}</h3>
              </Link>
              <p>{product.price} USD</p>
              {/* need to add functionality */}
              <button id="add" type="button">
                Add To Cart
              </button>
              <br />
              <br />
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.product.allProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: () => dispatch(getProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
