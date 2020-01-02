export interface IEstadoPedidoMySuffix {
  id?: number;
  descripcion?: string;
  pedidoId?: number;
}

export class EstadoPedidoMySuffix implements IEstadoPedidoMySuffix {
  constructor(public id?: number, public descripcion?: string, public pedidoId?: number) {}
}
