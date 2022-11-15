/* eslint-disable import/prefer-default-export */
export const formatPrice = (price) =>
  new Intl.NumberFormat("es-CO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    style: "currency",
    currency: "COP",
  }).format(price);
