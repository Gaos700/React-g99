import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container text-center mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body py-5">
              <h1 className="display-1 text-danger">404</h1>
              <h2 className="mb-4">¡Página no encontrada!</h2>
              <p className="lead mb-4">
                PAgina no encontrada
              </p>
              <div className="mb-4">

              </div>
              <div className="d-flex gap-3 justify-content-center">
                <Link to="/" className="btn btn-primary btn-lg">
                   Volver al inicio
                </Link>
                <Link to="/cart" className="btn btn-outline-primary btn-lg">
                   Ver carrito
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;