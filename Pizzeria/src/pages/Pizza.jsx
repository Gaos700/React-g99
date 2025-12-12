import { useState, useEffect } from "react";

const Pizza = () => {
  const [pizza, setPizza] = useState(null);

  useEffect(() => {
    const getPizza = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/pizzas/p001");
        const data = await res.json();
        setPizza(data);
      } catch (error) {
        console.log("Error cargando pizza", error);
      }
    };

    getPizza();
  }, []);

  if (!pizza) return <p>Cargando pizza...</p>;

  return (
    <div className="container text-center mt-5">
      <img
        src={pizza.img}
        alt={pizza.name}
        className="img-fluid rounded mb-4"
        style={{ maxWidth: "400px" }}
      />
      <h2>{pizza.name}</h2>
      <p className="text-muted">{pizza.desc}</p>

      <h4 className="mt-3">Precio: ${pizza.price}</h4>

      <h5 className="mt-4">Ingredientes:</h5>
      <ul className="list-unstyled">
        {pizza.ingredients.map((ing, i) => (
          <li key={i}>🍕 {ing}</li>
        ))}
      </ul>

      <button className="btn btn-danger mt-3">Añadir al carrito</button>
    </div>
  );
};

export default Pizza;