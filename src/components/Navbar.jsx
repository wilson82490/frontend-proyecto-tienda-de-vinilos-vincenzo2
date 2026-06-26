import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import CartIcon from "./CartIcon";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    navigate("/");
    logout();
  };

  return (
    <nav className="header-item">
      <Link to="/">Inicio</Link>
      <Link to="/vinilos">Vinilos</Link>
      <CartIcon />

      {user && user.admin && <Link to="/admin">Admin</Link>}
      {user && (
        <button type="button" onClick={handleLogout} aria-label="Cerrar sesión">
          Logout
        </button>
      )}

      {!user && <Link to="/auth/register">Registro</Link>}
      {!user && <Link to="/auth/login/">Login</Link>}
    </nav>
  );
}

export default Navbar;
