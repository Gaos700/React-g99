import React from 'react';

// Componente Navbar
const Navbar = () => {
  const total = 25000;
  const token = false;

  const formatPrice = (price) => {
    return price.toLocaleString('es-CL');
  };

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">Pizzería Mamma Mia!</span>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-light btn-sm">🍕 Home</button>
          {token ? (
            <>
              <button className="btn btn-outline-light btn-sm">🔓 Profile</button>
              <button className="btn btn-outline-light btn-sm">🔒 Logout</button>
            </>
          ) : (
            <>
              <button className="btn btn-outline-light btn-sm">🔐 Login</button>
              <button className="btn btn-outline-light btn-sm">🔐 Register</button>
            </>
          )}
          <button className="btn btn-primary btn-sm">
            🛒 Total: ${formatPrice(total)}
          </button>
        </div>
      </div>
    </nav>
  );
};

// Componente Header
const Header = () => {
  return (
    <header 
      className="text-white text-center py-5"
      style={{
        backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/apis-varias-mias.appspot.com/o/pizzeria%2Fpizza-1239077_640_cl.jpg?alt=media&token=6a9a33da-5c00-49d4-9080-784dcc87ec2c)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        minHeight: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
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

// Componente CardPizza
const CardPizza = ({ name, price, ingredients, img }) => {
  const formatPrice = (price) => {
    return price.toLocaleString('es-CL');
  };

  return (
    <div className="card h-100">
      <img src={img} className="card-img-top" alt={name} style={{ height: '200px', objectFit: 'cover' }} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">Pizza {name}</h5>
        
        <div className="border-top border-bottom py-2 my-2">
          <p className="card-text text-muted small mb-1 text-center">Ingredientes:</p>
          <p className="text-center small">🍕 {ingredients.join(', ')}</p>
        </div>
        
        <h4 className="text-center my-3">Precio: ${formatPrice(price)}</h4>
        
        <div className="mt-auto d-flex gap-2">
          <button className="btn btn-outline-dark flex-fill">Ver Más 👀</button>
          <button className="btn btn-dark flex-fill">Añadir 🛒</button>
        </div>
      </div>
    </div>
  );
};

// Componente Home
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
    <div>
      <Header />
      <div className="container py-5">
        <div className="row g-4">
          {pizzas.map((pizza, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4">
              <CardPizza
                name={pizza.name}
                price={pizza.price}
                ingredients={pizza.ingredients}
                img={pizza.img}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Componente Footer
const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-5">
      <p className="mb-0">© 2021 - Pizzería Mamma Mia! - Todos los derechos reservados</p>
    </footer>
  );
};

// Componente App principal
export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Home />
      </main>
      <Footer />
    </div>
  );
}