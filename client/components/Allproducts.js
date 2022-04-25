import React from "react";
import { connect } from "react-redux";
import { getProducts } from "../store/product";
// import {Link} from '.'
import MyGrid from "./ui/MyGrid";
import ProductItem from "./ProductItem";
import {
  GridItem as Gi,
  Heading,
  Input,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import { inputStyle } from "../styles";

export class AllProducts extends React.Component {
  constructor() {
    super();
    this.state = {
      search: "",
    };
    this.handleSearch = this.handleSearch.bind(this);
  }
  componentDidMount() {
    if (!this.props.products.length) this.props.getProducts();
  }
  handleSearch(e) {
    this.setState({ search: e.target.value });
  }
  render() {
    return (
      <MyGrid mb="3rem">
        <Gi gridColumn="1 / -1" as={HStack} spacing="1rem">
          <Heading color="tea.green" textTransform="uppercase">
            Enjoy
          </Heading>
          <Spacer />
          <Input
            name="search"
            type="text"
            placeholder="Your tea"
            {...inputStyle}
            onChange={this.handleSearch}
            value={this.state.search}
          />
        </Gi>
        {this.props.products
          .filter((product) => {
            if (!this.state.search.trim()) return true;
            return product.name
              .toLowerCase()
              .includes(this.state.search.toLowerCase().trim());
          })
          .map((product) => {
            return <ProductItem key={product.id} product={product} />;
          })}
      </MyGrid>
    );
  }
}

// <div className="allProducts">
//
//       </div>
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
