export interface IModoPagoMySuffix {
  id?: number;
  idModoPago?: number;
  descripcion?: string;
  pedidoId?: number;
}

export class ModoPagoMySuffix implements IModoPagoMySuffix {
  constructor(public id?: number, public idModoPago?: number, public descripcion?: string, public pedidoId?: number) {}
}
