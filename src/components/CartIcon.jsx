import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

function CartIcon() {
  const { totalItems } = useCart();

  return (
    <Link to="/carrito" className="cart-icon" aria-label="Carrito">
      Carrito
      {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
    </Link>
  );
}

export default CartIcon;
