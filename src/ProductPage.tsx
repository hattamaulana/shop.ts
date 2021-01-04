import * as React from "react";
import { Prompt, RouteComponentProps } from "react-router-dom";
import { IProduct, products, getProduct } from "./ProductData";
import Product from "./Product";

type Props = RouteComponentProps<{id: string}>;

interface IState {
    product?: IProduct;
    added: boolean;
    loading: boolean;
  }

  class ProductPage extends React.Component<Props, IState> {
    private handleAddClick = () => {
        this.setState({ added: true });
      };

    private navAwayMessage = () => "Are you sure you leave without buying this product?";

    public constructor(props: Props) {
      super(props);
      this.state = {
        added: false,
        loading: true,
      };
    }

    public async componentDidMount() {
        if (this.props.match.params.id) {
          const id: number = parseInt(this.props.match.params.id, 10);
          const product = await getProduct(id);
          if (product !== null) {
            this.setState({product, loading: false})
          }
        }
      }

    // React fragment merupakan sebuah mekanisme untuk menjadikan 
    // component yang ada di dalam ternary operator memiliki wrapper atau container
    // Hal ini sama seperti penggunaan div
      public render() {
        const product = this.state.product;
        // Prompt digunakan untuk memanggil dialog konfirmasi dialog 
        // Selama kondisi navigasi sesuai dengan yang diharapkan
        return (
          <div className="page-container">
            <Prompt when={ true } message={ this.navAwayMessage } />

            {product || this.state.loading ? (
              <Product
                product={ product }
                loading={this.state.loading}
                inBasket={ this.state.added }
                onAddToBasket={ this.handleAddClick } />
            ) : (
              <p>Product not found!</p>
            )}
          </div>
        );
      }
  }
  
  export default ProductPage;