import React from "react";

const Home = () => {
  const pizzas = [
    {
      name: "Napolitana",
      price: 5950,
      ingredients: ["mozzarella", "tomates", "jamón", "orégano"],
      img: "https://firebasestorage.googleapis.com/v0/b/apis-varias-mias.appspot.com/o/pizzeria%2Fpizza-1239077_640_cl.jpg?alt=media&token=6a9a33da-5c00-49d4-9080-784dcc87ec2c"
    },
    {
      name: "Española",
      price: 6950,
      ingredients: ["mozzarella", "gorgonzola", "parmesano", "provolone"],
      img: "https://firebasestorage.googleapis.com/v0/b/apis-varias-mias.appspot.com/o/pizzeria%2Fcheese-164872_640_com.jpg?alt=media&token=18b2b821-4d0d-43f2-a1c6-8c57bc388fab"
    },
    {
      name: "Pepperoni",
      price: 6950,
      ingredients: ["mozzarella", "pepperoni", "orégano"],
      img: "https://firebasestorage.googleapis.com/v0/b/apis-varias-mias.appspot.com/o/pizzeria%2Fpizza-1239077_640_com.jpg?alt=media&token=e7cde87a-08d5-4040-ac54-90f6c31eb3e3"
    }
  ];

  return (
    <div className="container py-5">
      <div className="row g-4">
        {pizzas.map((pizza, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100">
              <img 
                src={pizza.img} 
                className="card-img-top" 
                alt={pizza.name}
                style={{height: "200px", objectFit: "cover"}}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{pizza.name}</h5>
                <p className="card-text">
                  <strong>Ingredientes:</strong> {pizza.ingredients.join(", ")}
                </p>
                <div className="mt-auto">
                  <p className="h5 text-success">${pizza.price.toLocaleString('es-CL')}</p>
                  <div className="d-flex gap-2">
                    <button className="btn btn-outline-dark btn-sm">👀 Ver más</button>
                    <button className="btn btn-dark btn-sm">🛒 Añadir</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;