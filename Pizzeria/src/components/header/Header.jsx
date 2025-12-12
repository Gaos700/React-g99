import React from "react"
const Header = () => {
  return (
    <header 
      className="text-white text-center py-2"
      style={{
        minHeight: '10px'
      }}

    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0)'
      }}></div>
      <div style={{ position: 'relative', zIndex: 1 , paddingTop: '60px'}}>
        <h1 className="display-4 fw-bold">¡Pizzería Mamma Mia!</h1>
        <p className="lead">¡Tenemos las mejores pizzas que podrás encontrar!</p>
      </div>
    </header>
  );
};
export default Header;