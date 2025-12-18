import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, getTotal, clearCart } = useCart();
  const { token } = useUser();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const total = getTotal();

  const formatPrice = (price) => {
    return price.toLocaleString('es-CL');
  };

  const handleCheckout = async () => {
    if (!token) {
      setError('Debes iniciar sesión para realizar la compra');
      return;
    }

    if (cart.length === 0) {
      setError('Tu carrito está vacío');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const storedToken = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/checkouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`,
        },
        body: JSON.stringify({
          cart: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            count: item.count,
            img: item.img
          }))
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        clearCart();
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      } else {
        setError(data.message || 'Error al procesar la compra');
      }
    } catch (error) {
      setError('Error de conexión. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
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
                         Eliminar
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
              
              {success && (
                <div className="alert alert-success text-center" role="alert">
                  <h4>¡Compra realizada con éxito!</h4>
                  <p>Tu pedido ha sido procesado correctamente.</p>
                </div>
              )}

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              
              {cart.length > 0 && !success && (
                <div className="mt-4">
                  <hr />
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="mb-0">Total: ${formatPrice(total)}</h4>
                    <button 
                      className="btn btn-outline-danger"
                      onClick={clearCart}
                      disabled={loading}
                    >
                       Vaciar Carrito
                    </button>
                  </div>
                  <div className="d-flex gap-2">
                    <button 
                      className={`btn btn-lg flex-fill ${token ? 'btn-success' : 'btn-secondary'}`}
                      disabled={!token || loading}
                      onClick={handleCheckout}
                      title={!token ? 'Debes iniciar sesión para pagar' : ''}
                    >
                      {loading ? 'Procesando...' : ` ${token ? 'Proceder al Pago' : 'Inicia sesión para pagar'}`}
                    </button>
                    <Link to="/" className="btn btn-outline-primary btn-lg">
                       Seguir Comprando
                    </Link>
                  </div>
                  {!token && (
                    <div className="text-center mt-3">
                      <p className="text-muted mb-2">
                        Para realizar tu pedido necesitas iniciar sesión
                      </p>
                      <Link to="/login" className="btn btn-primary btn-sm me-2">
                         Iniciar Sesión
                      </Link>
                      <Link to="/register" className="btn btn-outline-primary btn-sm">
                         Registrarse
                      </Link>
                    </div>
                  )}
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