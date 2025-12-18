import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Login = () => {
    const { loginUser } = useUser();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');
    setLoading(true);

if (!email.trim() || !password.trim()){
    setError('Todos los campos son obligatorios');
    setLoading(false);
    return;
}
if (password.length < 6){
    setError('La contraseña debe tener al menos 6 caracteres');
    setLoading(false);
    return;
}

try {
    const result = await loginUser(email, password);
    
    if (result.success) {
        setSuccess(result.message);
        setTimeout(() => {
            navigate('/');
        }, 1500);
    } else {
        setError(result.message);
    }
} catch (error) {
    setError('Error inesperado');
} finally {
    setLoading(false);
}
};
return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-5">
              <h2 className="text-center mb-4">Login</h2>
              
              <div onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Ingresa tu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="alert alert-success" role="alert">
                    {success}
                  </div>
                )}

                <button 
                  type="submit" 
                  className="btn btn-primary w-100"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </button>
              </div>
              
              <div className="text-center">
                <p>¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
