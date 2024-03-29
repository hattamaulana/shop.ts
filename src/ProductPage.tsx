import * as React from "react";
import { Prompt, RouteComponentProps } from "react-router-dom";
import { getProducts, IProduct } from "./ProductData";
import { connect } from 'react-redux';
import { addToBasket } from './BasketActions';
import { getProduct } from './ProductsActions';
import { IApplicationState } from './Store';
import Product from "./Product";

  interface IProps extends RouteComponentProps<{ id: string }> {
    addToBasket: typeof addToBasket;
    getProduct: typeof getProduct;
    loading: boolean;
    product?: IProduct;
    added: boolean;
  }

  const mapDispatchToProps = (dispatch: any) => {
    return {
      addToBasket: (product: IProduct) => dispatch(addToBasket(product)),
      getProduct: (id: number) => dispatch(getProduct(id))
    }
  }

  const mapStateToProps = (store: IApplicationState) => {
    return {
      added: store.basket.products.some(p => store.products.currentProduct ? p.id === store.products.currentProduct.id : false),
      basketProducts: store.basket.products,
      loading: store.products.productsLoading,
      product: store.products.currentProduct || undefined
    };
  };

  class ProductPage extends React.Component<IProps> {

    private navAwayMessage = () => "Are you sure you leave without buying this product?";

    public async componentDidMount() {
        if (this.props.match.params.id) {
          const id: number = parseInt(this.props.match.params.id, 10);
          this.props.getProduct(id);
        }
      }

      private handleAddClick = () => {
        if (this.props.product) {
          this.props.addToBasket(this.props.product);
        }
      }

    // React fragment merupakan sebuah mekanisme untuk menjadikan 
    // component yang ada di dalam ternary operator memiliki wrapper atau container
    // Hal ini sama seperti penggunaan div
      public render() {
        const product = this.props.product;
        // Prompt digunakan untuk memanggil dialog konfirmasi dialog 
        // Selama kondisi navigasi sesuai dengan yang diharapkan
        return (
          <div className="page-container">
            <Prompt when={ !this.props.added } message={ this.navAwayMessage } />

            {product || this.props.loading ? (
              <Product
                product={ product }
                loading={this.props.loading}
                inBasket={ this.props.added }
                onAddToBasket={ this.handleAddClick } />
            ) : (
              <p>Product not found!</p>
            )}
          </div>
        );
      }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProductPage);