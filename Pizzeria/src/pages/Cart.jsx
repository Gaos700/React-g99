import React, { useState } from 'react';
import {pizzas} from '../data/pizzas';

const Cart = () => {
  
  const [cart, setCart] = useState([
    { ...pizzas[0], count: 2 },  
    { ...pizzas[1], count: 1 },  
    { ...pizzas[4], count: 1 },  
  ]);


  const increaseQuantity = (id) => {
    setCart(cart.map(item => 
      item.id === id ? { ...item, count: item.count + 1 } : item
    ));
  };


  const decreaseQuantity = (id) => {
    setCart(cart.map(item => 
      item.id === id && item.count > 0 ? { ...item, count: item.count - 1 } : item
    ).filter(item => item.count > 0));
  };


  const total = cart.reduce((sum, item) => sum + (item.price * item.count), 0);

  const formatPrice = (price) => {
    return price.toLocaleString('es-CL');
  };

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-dark text-white">
              <h3 className="mb-0">Detalles del pedido:</h3>
            </div>
            <div className="card-body">
              {cart.length === 0 ? (
                <p className="text-center text-muted">Tu carrito está vacío</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="d-flex align-items-center border-bottom py-3">
                    <img 
                      src={item.img} 
                      alt={item.name}
                      style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                      className="rounded me-3"
                    />
                    <div className="flex-grow-1">
                      <h5 className="mb-1">Pizza {item.name}</h5>
                      <p className="text-success mb-0 fw-bold">${formatPrice(item.price)}</p>
                    </div>
                    <div className="d-flex align-items-center">
                      <button 
                        className="btn btn-outline-danger btn-sm me-2"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        -
                      </button>
                      <span className="mx-2 fw-bold">{item.count}</span>
                      <button 
                        className="btn btn-outline-success btn-sm ms-2"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              )}
              
              {cart.length > 0 && (
                <div className="mt-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">Total: ${formatPrice(total)}</h4>
                    <button className="btn btn-success btn-lg">
                      Pagar 
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;