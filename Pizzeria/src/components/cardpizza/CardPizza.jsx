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
