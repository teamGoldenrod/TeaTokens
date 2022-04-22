import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProducts } from "../store/product";

/**
 * COMPONENT
 */

export class Home extends React.Component {
  constructor() {
    super();
    this.randomizeFeaturedProducts = this.randomizeFeaturedProducts.bind(this);
  }
  componentDidMount() {
    this.props.getProducts();
  }
  randomizeFeaturedProducts() {
    const products = this.props.products;
    const featured = [];
    const map = {};
    while (featured.length !== 4 && products.length) {
      const random = Math.floor(Math.random() * products.length);
      if (map[random] === undefined) {
        featured.push(products[random]);
      }
      map[random] = random;
    }
    return featured;
  }
  render() {
    console.log(this.props.products);
    return (
      <div className="home_page">
        <div className="center_container">
          <div className="img_home">
            <img src="?" />
          </div>
          <div className="content_home">
            <h4>Only The Best</h4>
            {this.props.user.id ? (
              <div className="siteInfo_home">
                <p>
                  <em>TeaTokens</em>TeaTokens offers the highest quality
                  hand-picked, full-leaf teas from the finest tea gardens and
                  estates. From tea beginners to avid tea drinkers, our
                  selection of rare teas, signature blends, and fun flavors in
                  loose tea, tea sachets, and convenient tea bags are perfect
                  for everyone.
                </p>
              </div>
            ) : (
              <div className="signup_home">
                <p>
                  Join E-List Loyalty and get the most unique tea in the world
                </p>
                <Link to="/signup">
                  <button>Sign up</button>
                </Link>
              </div>
            )}
            <div className="allProducts_home">
              <p>View Our Products</p>
              <Link to="/products">
                <button>Shop Now</button>
              </Link>
            </div>
          </div>
        </div>
        <h2>Featured Products</h2>
        <div className="featured_products">
          {this.props.products.length &&
            this.randomizeFeaturedProducts().map((product) => {
              return (
                <div className="single_featured_product" key={product.id}>
                  <Link to={`/products/${product.id}`}>
                    <img
                      className="single_featured_img"
                      src={product.imageUrl}
                    />
                    <h3>{product.name}</h3>
                  </Link>
                  <p>{product.price} USD</p>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.auth,
    products: state.product.allProducts,
  };
};
const mapDispatch = (dispatch) => {
  return {
    getProducts: () => dispatch(getProducts()),
  };
};

export default connect(mapState, mapDispatch)(Home);
