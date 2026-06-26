export const formatPrice = (price) => {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  })
    .format(price)
    .replace(/\u00A0/g, " ");
};
