import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

/**
 * COMPONENT
 */

export const Home = (props) => {
  const products = props.products.allProducts;
  const featured = [];
  const map = {};
  while (featured.length !== 4 && products.length) {
    const random = Math.floor(Math.random() * 8);
    if (map[random] === undefined) {
      featured.push(products[random]);
    }
    map[random] = random;
  }

  return (
    <div className="home_page">
      <div className="center_container">
        <div className="img_home">
          <img src="?" />
        </div>
        <div className="content_home">
          <h4>Only The Best</h4>
          {props.user.id ? (
            <div className="siteInfo_home">
              <p>
                <em>TeaTokens</em>TeaTokens offers the highest quality
                hand-picked, full-leaf teas from the finest tea gardens and
                estates. From tea beginners to avid tea drinkers, our selection
                of rare teas, signature blends, and fun flavors in loose tea,
                tea sachets, and convenient tea bags are perfect for everyone.
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
        {/*featured.map((product) => {
          return (
            <div className="single_featured_product" key={product.id}>
              <Link to={`/products/${product.id}`}>
                <img className="single_featured_img" src={product.imageUrl} />
                <h3>{product.name}</h3>
              </Link>
              <p>{product.price / 100} USD</p>
            </div>
          );
        })*/}
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.auth,
    products: state.products,
  };
};

export default connect(mapState)(Home);
