import { useState } from "react";
import { useCart } from "../hooks/useCart";

function AddToCartButton({ vinilo }) {
  const { addItem } = useCart();
  const [message, setMessage] = useState("");

  const handleClick = (event) => {
    event.stopPropagation();

    if (!vinilo?.price && vinilo?.price !== 0) {
      setMessage("Precio no disponible");
      return;
    }

    addItem(vinilo);
    setMessage("Añadido al carrito");
    setTimeout(() => setMessage(""), 1500);
  };

  return (
    <div className="add-to-cart">
      <button type="button" className="button" onClick={handleClick}>
        Añadir al carrito
      </button>
      {message && <p className="cart-feedback">{message}</p>}
    </div>
  );
}

export default AddToCartButton;
