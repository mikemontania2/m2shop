export interface VarianteDetalleModel {
  id: number;
  sku: string;
  nombre: string;
  slug: string;
  precio: number;
  precioOriginal: number;
  descuentoPorcentaje: string;
  imagenPrincipal: string;
  destacado: boolean;
  nuevo: boolean;
  descripcion: string;
  usosRecomendados: string[];
  propiedades: string[];
  opciones:VarianteOpcion[];
}

/**
 * Representa una opción o atributo seleccionable del producto,
 * por ejemplo "Color", "Tamaño", "Presentación", etc.
 */
export interface VarianteOpcion {
  id: number;
  nombre: string;
  orden: number;
  valores: VarianteOpcionValor[];
}

/**
 * Valor posible de una opción (atributo).
 * Ejemplo: "Rojo", "500ml", "Pastilla 100g".
 */
export interface VarianteOpcionValor {
  id: number;
  valor: string;
  metadata: ValorMetadata;
  slug: string;
  imagenUrl: string;
  seleccionado: boolean;
}

/**
 * Metadatos adicionales que pueden venir del backend,
 * como color, imagen, etc.
 */
export interface ValorMetadata {
  color?: string;
  imagen?: string;
  [key: string]: any; // permite extensiones futuras
}
