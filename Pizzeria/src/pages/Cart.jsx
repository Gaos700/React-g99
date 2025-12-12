import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, getTotal, clearCart } = useCart();
  const total = getTotal();

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
                <div className="text-center py-5">
                  <h4 className="text-muted mb-3"> Tu carrito está vacío</h4>
                  <p className="text-muted mb-4">¡Agrega algunas deliciosas pizzas!</p>
                  <Link to="/" className="btn btn-primary">
                     Ver Pizzas
                  </Link>
                </div>
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
                      <button 
                        className="btn btn-link text-danger p-0 small"
                        onClick={() => removeFromCart(item.id)}
                      >
                        🗑 Eliminar
                      </button>
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
                  <hr />
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="mb-0">Total: ${formatPrice(total)}</h4>
                    <button 
                      className="btn btn-outline-danger"
                      onClick={clearCart}
                    >
                       Vaciar Carrito
                    </button>
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn btn-success btn-lg flex-fill">
                       Proceder al Pago
                    </button>
                    <Link to="/" className="btn btn-outline-primary btn-lg">
                       Seguir Comprando
                    </Link>
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