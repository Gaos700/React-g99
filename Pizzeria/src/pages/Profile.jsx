import { useNavigate } from 'react-router-dom';


function Profile() {
  const navigate = useNavigate();
  
  const userEmail = "usuario@ejemplo.com";

  const handleLogout = () => {

    console.log("Cerrando sesión...");
    navigate('/');
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Mi Perfil</h2>
        
        <div className="profile-info">
          <label>Email:</label>
          <p>{userEmail}</p>
        </div>

        <button onClick={handleLogout} className="btn-logout">
          🚪 Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

export default Profile;