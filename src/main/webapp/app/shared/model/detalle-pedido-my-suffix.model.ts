export interface IDetallePedidoMySuffix {
  id?: number;
  idPedido?: number;
  idProducto?: number;
  precioCompra?: number;
  productId?: number;
  pedidoId?: number;
}

export class DetallePedidoMySuffix implements IDetallePedidoMySuffix {
  constructor(
    public id?: number,
    public idPedido?: number,
    public idProducto?: number,
    public precioCompra?: number,
    public productId?: number,
    public pedidoId?: number
  ) {}
}
