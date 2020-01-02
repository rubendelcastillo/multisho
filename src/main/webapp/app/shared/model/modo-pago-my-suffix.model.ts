export interface IModoPagoMySuffix {
  id?: number;
  descripcion?: string;
  pedidoId?: number;
}

export class ModoPagoMySuffix implements IModoPagoMySuffix {
  constructor(public id?: number, public descripcion?: string, public pedidoId?: number) {}
}
