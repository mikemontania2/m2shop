// ========================================
// pedidos.service.ts - Servicio de Pedidos
// ========================================
import api from './api';

// ========================================
// INTERFACES
// ========================================
export interface UserOrder {
  id: number
  numeroPedido: string
  usuarioId: number
  estado: 'pendiente' | 'confirmado' | 'preparando' | 'enviado' | 'entregado' | 'cancelado'
  descuento: string
  importeDescuento: string
  subtotal: string
  total: string
  costoEnvio: string
  metodoPago: 'efectivo' | 'tarjeta' | 'transferencia' | 'paypal' | 'otros'
  estadoPago: 'pendiente' | 'pagado' | 'rechazado' | 'reembolsado'
  direccionEnvioId: number
  notasCliente?: string
  notasInternas?: string | null
  fechaEstimadaEntrega?: string
  codigoSeguimiento?: string | null
  createdAt: string
  updatedAt: string
  DireccionEnvio?: DireccionPedido
}
export interface ClienteCheckout {
  tipo: 'invitado' | 'registrado';
  usuarioId?: number;
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  notas?: string;
}

export interface ItemCheckout {
  productoId: number;
  varianteId: number;
  nombreProducto?: string;
  nombre?: string;
  sku?: string;
  imagenUrl?: string;
  imagen?: string;
  cantidad: number;
  precioUnitario?: number;
  precio?: number;
  descuento?: number;
  importeDescuento?: number;
  subtotal: number;
  total: number;
}

export interface CrearPedidoRequest {
  cliente: ClienteCheckout;
  items: ItemCheckout[];
  total: number;
  metodoPago: 'efectivo' | 'transferencia' | 'tarjeta' | 'contacto' | 'otros';
  shippingCost?: number;
  notasCliente?: string;
}

export interface ItemPedido {
  id: number;
  nombreProducto: string;
  sku: string;
  imagenUrl: string;
  cantidad: number;
  precioUnitario: number;
  descuento: number;
  importeDescuento: number;
  subtotal: number;
  total: number;
}

export interface DireccionPedido {
  calle: string;
  numero?: string;
  ciudad: string;
  barrio: string;
  referencia?: string;
}

export interface Pedido {
  id: number;
  numeroPedido: string;
  usuarioId: number;
  estado: 'pendiente' | 'confirmado' | 'preparando' | 'enviado' | 'entregado' | 'cancelado';
  descuento: number;
  importeDescuento: number;
  subtotal: number;
  total: number;
  costoEnvio: number;
  metodoPago: 'efectivo' | 'tarjeta' | 'transferencia' | 'paypal' | 'otros';
  estadoPago: 'pendiente' | 'pagado' | 'rechazado' | 'reembolsado';
  notasCliente?: string;
  notasInternas?: string;
  fechaEstimadaEntrega?: string;
  codigoSeguimiento?: string;
  createdAt: string;
  updatedAt: string;
  Usuario?: {
    id: number;
    nombre: string;
    email: string;
    telefono?: string;
  };
  DireccionEnvio?: DireccionPedido;
  ItemPedidos?: ItemPedido[];
}

export interface PedidoResumen {
  id: number;
  numeroPedido: string;
  total: number;
  estado: string;
  metodoPago: string;
  fechaEstimadaEntrega?: string;
}

export interface CrearPedidoResponse {
  mensaje: string;
  pedido: PedidoResumen;
}

export interface ListaPedidosResponse {
  pedidos: UserOrder[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
}

export interface DetallePedidoResponse {
  pedido: Pedido;
}

export interface ActualizarEstadoRequest {
  estado: 'pendiente' | 'confirmado' | 'preparando' | 'enviado' | 'entregado' | 'cancelado';
  codigoSeguimiento?: string;
  notasInternas?: string;
}

export interface FiltrosPedidos {
  page?: number;
  limit?: number;
  estado?: string;
  metodoPago?: string;
  fechaDesde?: string;
  fechaHasta?: string;
  buscar?: string;
}

// ========================================
// SERVICIO DE PEDIDOS
// ========================================

class PedidosService {
  /**
   * Crear pedido desde checkout
   */
  async crearPedido(data: CrearPedidoRequest): Promise<CrearPedidoResponse> {
    try {
      console.log('📞 PedidosService.crearPedido() - Llamando a API:', {
        cliente: data.cliente.nombre,
        items: data.items.length,
        total: data.total
      });

      const response = await api.post<CrearPedidoResponse>('/pedidos/crear', data);
      
      console.log('✅ PedidosService.crearPedido() - Respuesta recibida:', {
        numeroPedido: response.data.pedido.numeroPedido,
        estado: response.data.pedido.estado
      });

      return response.data;
    } catch (error: any) {
      console.error('❌ PedidosService.crearPedido() - Error:', error.response?.data || error.message);
      
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      
      throw new Error('Error al crear el pedido. Por favor intenta nuevamente.');
    }
  }

  /**
   * Obtener pedidos del usuario actual
   */
  async obtenerMisPedidos(filtros?: FiltrosPedidos): Promise<ListaPedidosResponse> {
    try {
      // Obtener el usuario del localStorage
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        throw new Error('Usuario no autenticado');
      }

      const user = JSON.parse(userStr);
      const usuarioId = user.id;

      console.log('📞 PedidosService.obtenerMisPedidos() - Usuario:', usuarioId);

      const response = await api.get<ListaPedidosResponse>(
        `/pedidos/usuario/${usuarioId}`,
        { params: filtros }
      );

      console.log('✅ PedidosService.obtenerMisPedidos() - Pedidos:', response.data.pedidos.length);

      return response.data;
    } catch (error: any) {
      console.error('❌ PedidosService.obtenerMisPedidos() - Error:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Obtener detalle de un pedido específico
   */
  async obtenerPedido(pedidoId: number): Promise<Pedido> {
    try {
      console.log('📞 PedidosService.obtenerPedido() - ID:', pedidoId);

      const response = await api.get<DetallePedidoResponse>(`/pedidos/${pedidoId}`);

      console.log('✅ PedidosService.obtenerPedido() - Pedido obtenido:', response.data.pedido.numeroPedido);

      return response.data.pedido;
    } catch (error: any) {
      console.error('❌ PedidosService.obtenerPedido() - Error:', error.response?.data || error.message);
      
      if (error.response?.status === 404) {
        throw new Error('Pedido no encontrado');
      }
      
      if (error.response?.status === 403) {
        throw new Error('No tienes permiso para ver este pedido');
      }
      
      throw new Error('Error al obtener el pedido');
    }
  }

  /**
   * Obtener todos los pedidos (Admin)
   */
  async obtenerTodosPedidos(filtros?: FiltrosPedidos): Promise<ListaPedidosResponse> {
    try {
      console.log('📞 PedidosService.obtenerTodosPedidos() - Filtros:', filtros);

      const response = await api.get<ListaPedidosResponse>(
        '/pedidos/admin/todos',
        { params: filtros }
      );

      console.log('✅ PedidosService.obtenerTodosPedidos() - Total:', response.data.pagination.total);

      return response.data;
    } catch (error: any) {
      console.error('❌ PedidosService.obtenerTodosPedidos() - Error:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Actualizar estado de un pedido (Admin/Vendedor)
   */
  async actualizarEstado(
    pedidoId: number, 
    data: ActualizarEstadoRequest
  ): Promise<{ mensaje: string; pedido: PedidoResumen }> {
    try {
      console.log('📞 PedidosService.actualizarEstado() - ID:', pedidoId, 'Estado:', data.estado);

      const response = await api.put(`/pedidos/${pedidoId}/estado`, data);

      console.log('✅ PedidosService.actualizarEstado() - Actualizado');

      return response.data;
    } catch (error: any) {
      console.error('❌ PedidosService.actualizarEstado() - Error:', error.response?.data || error.message);
      
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      
      throw new Error('Error al actualizar el estado del pedido');
    }
  }

  /**
   * Obtener estadísticas de pedidos (Admin)
   */
  async obtenerEstadisticas(): Promise<{
    totalPedidos: number;
    pedidosPendientes: number;
    pedidosEnviados: number;
    pedidosEntregados: number;
    ventasTotales: number;
  }> {
    try {
      console.log('📞 PedidosService.obtenerEstadisticas()');

      // Obtener todos los pedidos sin límite
      const response = await api.get<ListaPedidosResponse>('/pedidos/admin/todos', {
        params: { limit: 1000 }
      });

      const pedidos = response.data.pedidos;

      const stats = {
        totalPedidos: pedidos.length,
        pedidosPendientes: pedidos.filter(p => p.estado === 'pendiente').length,
        pedidosEnviados: pedidos.filter(p => p.estado === 'enviado').length,
        pedidosEntregados: pedidos.filter(p => p.estado === 'entregado').length,
        ventasTotales: pedidos.reduce((sum, p) => sum + Number(p.total), 0)
      };

      console.log('✅ PedidosService.obtenerEstadisticas() - Stats:', stats);

      return stats;
    } catch (error: any) {
      console.error('❌ PedidosService.obtenerEstadisticas() - Error:', error);
      throw error;
    }
  }

  /**
   * Formatear precio en guaraníes
   */
  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-PY', {
      style: 'currency',
      currency: 'PYG',
      minimumFractionDigits: 0
    }).format(price);
  }

  /**
   * Obtener etiqueta de estado en español
   */
  getEstadoLabel(estado: string): string {
    const labels: Record<string, string> = {
      'pendiente': 'Pendiente',
      'confirmado': 'Confirmado',
      'preparando': 'Preparando',
      'enviado': 'Enviado',
      'entregado': 'Entregado',
      'cancelado': 'Cancelado'
    };
    return labels[estado] || estado;
  }

  /**
   * Obtener color de estado
   */
  getEstadoColor(estado: string): string {
    const colors: Record<string, string> = {
      'pendiente': '#FFA500',
      'confirmado': '#2196F3',
      'preparando': '#9C27B0',
      'enviado': '#FF9800',
      'entregado': '#4CAF50',
      'cancelado': '#F44336'
    };
    return colors[estado] || '#757575';
  }

  /**
   * Obtener etiqueta de método de pago
   */
  getMetodoPagoLabel(metodo: string): string {
    const labels: Record<string, string> = {
      'efectivo': '💵 Efectivo',
      'tarjeta': '💳 Tarjeta',
      'transferencia': '🏦 Transferencia',
      'paypal': 'PayPal',
      'otros': '📞 A coordinar'
    };
    return labels[metodo] || metodo;
  }
}

export default new PedidosService();