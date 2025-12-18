import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Pizza = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPizza = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/pizzas/${id || 'p001'}`);
        if (!res.ok) {
          throw new Error('Pizza no encontrada');
        }
        const data = await res.json();
        setPizza(data);
      } catch (error) {
        console.log("Error cargando pizza", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getPizza();
  }, [id]);

  const formatPrice = (price) => {
    return price.toLocaleString('es-CL');
  };

  const handleAddToCart = () => {
    if (pizza) {
      addToCart(pizza);
    }
  };

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando pizza...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container text-center mt-5">
        <div className="alert alert-danger">
          <h4>Error</h4>
          <p>{error}</p>
          <Link to="/" className="btn btn-primary">
             Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  if (!pizza) return <p>Cargando pizza...</p>;

  return (
    <div className="container text-center mt-5">
      <img
        src={pizza.img}
        alt={pizza.name}
        className="img-fluid rounded mb-4"
        style={{ maxWidth: "400px" }}
      />
      <h2 className="text-capitalize">Pizza {pizza.name}</h2>
      <p className="text-muted">{pizza.desc}</p>

      <h4 className="mt-3 text-primary">Precio: ${formatPrice(pizza.price)}</h4>

      <h5 className="mt-4">🍕 Ingredientes:</h5>
      <ul className="list-unstyled">
        {pizza.ingredients.map((ing, i) => (
          <li key={i} className="mb-1">
            <span className="badge bg-light text-dark me-2">{ing}</span>
          </li>
        ))}
      </ul>

      <div className="d-flex gap-2 justify-content-center mt-4">
        <button 
          className="btn btn-primary"
          onClick={handleAddToCart}
        >
          🛒 Añadir al carrito
        </button>
        <Link to="/" className="btn btn-outline-primary">
          🏠 Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default Pizza;