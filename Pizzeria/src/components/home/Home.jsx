import React from 'react';
import CardPizza from '../cardpizza/CardPizza';
import {pizzas} from '../../data/pizzas';

const Home = () => {
  return (
    <main className="container my-4">
      <div className="text-center mb-5">
        <h1 className="display-4 text-white">¡Pizzería Mamma Mia!</h1>
        <p className="lead text-light">¡Tenemos las mejores pizzas que podrás encontrar!</p>
      </div>
      
      <div className="row g-4">
        {pizzas.map((pizza) => (
          <div key={pizza.id} className="col-md-4 col-lg-4">
            <CardPizza
              name={pizza.name}
              price={pizza.price}
              ingredients={pizza.ingredients}
              img={pizza.img}
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;