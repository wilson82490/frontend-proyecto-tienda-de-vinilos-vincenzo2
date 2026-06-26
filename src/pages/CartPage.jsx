import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../utils/formatPrice";

function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <main>
        <section className="catalog-section">
          <div className="container">
            <div className="section-header">
              <h2>Carrito</h2>
              <p>Tu selección de vinilos</p>
            </div>
            <p className="empty-message">Tu carrito está vacío.</p>
            <Link className="button" to="/vinilos">
              Ver vinilos
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="catalog-section">
        <div className="container">
          <div className="section-header">
            <h2>Carrito</h2>
            <p>{items.length} {items.length === 1 ? "artículo" : "artículos"}</p>
          </div>

          <ul className="cart-list">
            {items.map((item) => (
              <li key={item._id} className="cart-item">
                <img src={item.image} alt={item.title} />

                <div className="cart-item-info">
                  <h3>{item.title}</h3>
                  <p className="cart-item-price">{formatPrice(item.price)}</p>

                  <div className="cart-item-actions">
                    <div className="cart-quantity">
                      <button
                        type="button"
                        aria-label={`Reducir cantidad de ${item.title}`}
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        aria-label={`Aumentar cantidad de ${item.title}`}
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className="cart-remove-button"
                      onClick={() => removeItem(item._id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>

                <p className="cart-item-subtotal">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </li>
            ))}
          </ul>

          <div className="cart-total">
            <p>Total: {formatPrice(totalPrice)}</p>
          </div>

          <div className="cart-footer-actions">
            <button type="button" className="button cart-clear-button" onClick={clearCart}>
              Vaciar carrito
            </button>
            <Link className="button" to="/vinilos">
              Seguir comprando
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default CartPage;
