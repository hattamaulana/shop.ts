import * as React from "react";
import { IProduct } from './ProductData';
import { RouteComponentProps } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { IApplicationState } from './Store';
import { getProducts } from './ProductsActions';
import ProductsList from './ProductsList';

import "url-search-params-polyfill";

interface IProps extends RouteComponentProps {
  getProducts: typeof getProducts;
  loading: boolean;
  products: IProduct[];
}

class ProductsPage extends React.Component<IProps> {

    public componentDidMount() {
        this.props.getProducts();
    }
    // Perbedaan link dan nav link bisa di lihat di file Header.tsx
    public render() {
        const searchParams = new URLSearchParams(this.props.location.search);
        const search = searchParams.get('search') || '';

        return (
          <div className="page-container">
            <p>
              Welcome to React Shop where you can get all your tools for ReactJS!
            </p>
            <ProductsList
              search={search}
              products={this.props.products}
              loading={this.props.loading} />
          </div>
        );
    }
}

const mapStateToProps = (store: IApplicationState) => {
  return {
    loading: store.products.productsLoading,
    products: store.products.products,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getProducts: () => dispatch(getProducts())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsPage);
