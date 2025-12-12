import React, { useState, useEffect } from "react";
import CardPizza from "../components/cardpizza/CardPizza";
import Header from "../components/header/Header";

const Home = () => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    const getPizzas = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/pizzas");
        const data = await res.json();
        setPizzas(data);
      } catch (error) {
        console.log("Error cargando pizzas", error);
      }
    };

    getPizzas();
  }, []);

  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center flex-wrap gap-4 mt-4 pb-5">
      {pizzas.length === 0 ? (
        <p>Cargando pizzas...</p>
      ) : (
        pizzas.map((pizza) => (
          <CardPizza
            key={pizza.id}
            id={pizza.id}
            name={pizza.name}
            price={pizza.price}
            ingredients={pizza.ingredients}
            img={pizza.img}
          />
        ))
      )}
      </div>
    </>
  );
};

export default Home;