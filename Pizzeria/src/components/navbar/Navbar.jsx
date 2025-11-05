import React from 'react';

import ".Navbar.css"
const Navbar = () => {
  const total = 25000;
  const token = false;

  const formatPrice = (price) => {
    return price.toLocaleString('es-CL');
  };

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">Pizzería Mamma Mia!</span>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-light btn-sm">🍕 Home</button>
          {token ? (
            <>
              <button className="btn btn-outline-light btn-sm">🔓 Profile</button>
              <button className="btn btn-outline-light btn-sm">🔒 Logout</button>
            </>
          ) : (
            <>
              <button className="btn btn-outline-light btn-sm">🔐 Login</button>
              <button className="btn btn-outline-light btn-sm">🔐 Register</button>
            </>
          )}
          <button className="btn btn-primary btn-sm">
            🛒 Total: ${formatPrice(total)}
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;