import React from "react"
const Header = () => {
  return (
    <header 
      className="text-white text-center py-5"

    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)'
      }}></div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h1 className="display-3 fw-bold">¡Pizzería Mamma Mia!</h1>
        <p className="lead">¡Tenemos las mejores pizzas que podrás encontrar!</p>
      </div>
    </header>
  );
};
export default Header;