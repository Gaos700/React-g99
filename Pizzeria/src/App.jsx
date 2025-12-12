import React from "react";
import Navbar from "./components/navbar/Navbar";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Cart from "./components/cart/Cart";
import Footer from "./components/footer/Footer";
import Pizza from "./components/pizza/Pizza"
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <Navbar />
      <Header />
      <div className="flex-grow-1">
      {/*<Home />*/}
        <Pizza /> 
      </div>
      <Footer />
    </div>
  );
}

export default App;