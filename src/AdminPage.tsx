import * as React from "react";
import { NavLink, Route, RouteComponentProps } from "react-router-dom";
import AdminProducs from './AdminProducts';
import AdminUsers from './AdminUsers';


const AdminPage: React.SFC = () => {
  return (
    <div className="page-container">
      <h1>Admin Panel</h1>
      <ul className="admin-sections">
          <li key="users">
            <NavLink to={`/admin/users`} activeClassName="admin-link-active">
              Users
            </NavLink>
          </li>

          <li key="products">
            <NavLink to={`/admin/products`} activeClassName="admin-link-active">
              Products
            </NavLink>
          </li>
      </ul>

      <Route path="/admin/users" component={AdminUsers} />
      <Route path="/admin/products" component={AdminProducs} />
    </div>
  );
};

export default AdminPage;