import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function Profile() {
  const navigate = useNavigate();
  const { logout, email, getProfile } = useUser();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const result = await getProfile();
        
        if (result.success) {
          setProfileData(result.data);
        } else {
          setError(result.message);
        }
      } catch (error) {
        setError('Error al cargar el perfil');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [getProfile]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <p>Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h2 className="mb-0"> Mi Perfil</h2>
            </div>
            <div className="card-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              
              <div className="row mb-4">
                <div className="col-md-8">
                  <h5>Información Personal</h5>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Email:</label>
                    <p className="form-control-plaintext">{email || 'No disponible'}</p>
                  </div>
                </div>
                <div className="col-md-4 text-end">
                  <button 
                    className="btn btn-danger"
                    onClick={handleLogout}
                  >
                     Cerrar Sesión
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;