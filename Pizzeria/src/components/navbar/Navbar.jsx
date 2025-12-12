import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import "./Navbar.css";

const Navbar = () => {
  const { getTotal, getItemCount } = useCart();
  const total = getTotal();
  const itemCount = getItemCount();
  const token = false;

  const formatPrice = (price) => {
    return price.toLocaleString('es-CL');
  };

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand mb-0 h1 text-decoration-none">
          Pizzería Mamma Mia!
        </Link>
        <div className="d-flex gap-2">
          <Link to="/" className="btn btn-outline-light btn-sm text-decoration-none">
             Home
          </Link>
          {token ? (
            <>
              <Link to="/profile" className="btn btn-outline-light btn-sm text-decoration-none">
                 Profile
              </Link>
              <button className="btn btn-outline-light btn-sm"> Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-light btn-sm text-decoration-none">
                 Login
              </Link>
              <Link to="/register" className="btn btn-outline-light btn-sm text-decoration-none">
                 Register
              </Link>
            </>
          )}
          <Link to="/cart" className="btn btn-primary btn-sm text-decoration-none position-relative">
             Total: ${formatPrice(total)}
            {itemCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;