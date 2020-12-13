import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { URLSearchParams } from "url";
import "url-search-params-polyfill";

import logo from "./logo.svg";

// Perbedaan antara NavLink dan Link adalah :
// NavLink digunakan untuk berganti halaman maka web browser akan menandai uri atau link pernah dikunjugin
// Link sebaliknya dari NavLink
const Header: React.SFC<RouteComponentProps> = props => {
    const [search, setSearch] = React.useState("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.currentTarget.value);
    };

    const handleSearchKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        props.history.push(`/products?search=${search}`);
      }
    };

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
        </div>
        <img src={logo} className="header-logo" alt="logo" />
        <h1 className="header-title">React Shop</h1>
        <nav>
          ...
        </nav>
      </header>
    );
  };
  
  export default withRouter(Header);