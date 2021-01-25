import * as React from "react";
import { RouteComponentProps, withRouter, NavLink } from "react-router-dom";
import "url-search-params-polyfill";

import logo from "./logo.svg";
import BasketSummary from './BasketSummary';
import { connect } from 'react-redux';
import { IApplicationState } from './Store';

interface IProps extends RouteComponentProps {
  basketCount: number;
}

const mapStateToProps = (store: IApplicationState) => {
  return {
    basketCount: store.basket.products.length
  }
}

// Perbedaan antara NavLink dan Link adalah :
// NavLink digunakan untuk berganti halaman maka web browser akan menandai uri atau link pernah dikunjugin
// Link sebaliknya dari NavLink
class Header extends React.Component<IProps, IState> {

    public constructor(props: IProps) {

    }

    return (
      <header className="header">
        <div className="search-container">
          <input
            type="search"
            placeholder="search"
            value={search}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeydown}
            />

            <BasketSummary count={ this.props.basketCount } />
        </div>
        <img src={logo} className="header-logo" alt="logo" />
        <h1 className="header-title">React Shop</h1>
        <nav>
          <NavLink to="/products" className="header-link" activeClassName="header-link-active">
            Products
          </NavLink>
          <NavLink to="/contactus" className="header-link" activeClassName="header-link-active">
            Contact Us
          </NavLink>
          <NavLink to="/admin" className="header-link" activeClassName="header-link-active">
            Admin
          </NavLink>
        </nav>
      </header>
    );
  };
  
  export default connect(mapStateToProps)(withRouter(Header));