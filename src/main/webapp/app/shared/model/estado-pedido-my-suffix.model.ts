export interface IEstadoPedidoMySuffix {
  id?: number;
  idEstado?: number;
  descripcion?: string;
  pedidoId?: number;
}

export class EstadoPedidoMySuffix implements IEstadoPedidoMySuffix {
  constructor(public id?: number, public idEstado?: number, public descripcion?: string, public pedidoId?: number) {}
}
