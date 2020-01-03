export interface IDetallePedidoMySuffix {
  id?: number;
  idPedido?: number;
  idProducto?: number;
  precioCompra?: number;
  pedidoId?: number;
  productId?: number;
}

export class DetallePedidoMySuffix implements IDetallePedidoMySuffix {
  constructor(
    public id?: number,
    public idPedido?: number,
    public idProducto?: number,
    public precioCompra?: number,
    public pedidoId?: number,
    public productId?: number
  ) {}
}
