import React, { Fragment as Fr } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProducts } from "../store/product";
import {
  Heading,
  Grid,
  Image,
  GridItem as Gi,
  Text,
  VStack,
} from "@chakra-ui/react";

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
    while (featured.length !== 6 && products.length) {
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
      <Fr>
        <Grid
          templateColumns="repeat(auto-fill,minmax(20rem,1fr))"
          gap="2.5rem"
        >
          <Gi gridColumn="1 / span 2">
            <Image
              src="https://leavla.com/wp-content/uploads/2019/06/Darjeeling-Green-Tera.jpg"
              alt="tea image"
              objectFit="cover"
              width="100%"
            />
          </Gi>
          <Gi alignSelf="center">
            <Heading color="tea.brown" fontWeight="700" fontSize="5xl" mb={4}>
              Only The Best
            </Heading>
            <Text fontSize="lg">
              TeaTokens offers the highest quality hand-picked, full-leaf teas
              from the finest tea gardens and estates.
            </Text>
          </Gi>
          <Gi gridColumn="1 / -1">
            <Heading color="tea.green" textTransform="uppercase">
              Featured
            </Heading>
          </Gi>
          {this.props.products.length &&
            this.randomizeFeaturedProducts().map((product) => {
              return (
                <Gi key={product.id}>
                  <VStack spacing="10px">
                    <Image src={product.imageUrl} alt="tea image" />
                    <Heading color="tea.matcha">{product.name}</Heading>
                    <Text>{product.price} USD</Text>
                  </VStack>
                </Gi>
              );
            })}
        </Grid>
        {/*<div className="home_page">
        <div className="center_container">
          <div className="img_home">
            <img src="?" />
          </div>
          <div className="content_home">
            <Heading>Only The Best</Heading>
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

        </div>
          </div>*/}
      </Fr>
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
