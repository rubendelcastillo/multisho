export interface IModoEnvioMySuffix {
  id?: number;
  modoEnvio?: string;
  pedidoId?: number;
}

export class ModoEnvioMySuffix implements IModoEnvioMySuffix {
  constructor(public id?: number, public modoEnvio?: string, public pedidoId?: number) {}
}
