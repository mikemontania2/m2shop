

/**
 * Calcular precios con descuento
 */
const aplicarDescuento = (precio, precioOriginal, descuento) => {
  let finalPrice = parseFloat(precio);
  let originalPrice = parseFloat(precioOriginal) || 0;

  if (descuento ) {
    if (!originalPrice) {
      originalPrice = finalPrice;
    }  
      finalPrice = finalPrice * (1 - parseFloat(descuento.valor) / 100); 
  } 
  return {
    price: Math.round(finalPrice),
    originalPrice: Math.round(originalPrice)
  };
};

module.exports = {
  aplicarDescuento
};