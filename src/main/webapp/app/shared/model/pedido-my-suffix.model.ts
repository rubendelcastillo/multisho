import { Moment } from 'moment';
import { IDetallePedidoMySuffix } from 'app/shared/model/detalle-pedido-my-suffix.model';

export interface IPedidoMySuffix {
  id?: number;
  fechaPedido?: Moment;
  fechaNotificacion?: Moment;
  idModoPago?: number;
  cargoPorCoste?: number;
  gastosEnvio?: number;
  idModoEnvio?: number;
  jobTitle?: string;
  fechaConfirmacion?: Moment;
  modoEnvioId?: number;
  modoPagoId?: number;
  estadoPedidoId?: number;
  idPedidos?: IDetallePedidoMySuffix[];
  clientId?: number;
}

export class PedidoMySuffix implements IPedidoMySuffix {
  constructor(
    public id?: number,
    public fechaPedido?: Moment,
    public fechaNotificacion?: Moment,
    public idModoPago?: number,
    public cargoPorCoste?: number,
    public gastosEnvio?: number,
    public idModoEnvio?: number,
    public jobTitle?: string,
    public fechaConfirmacion?: Moment,
    public modoEnvioId?: number,
    public modoPagoId?: number,
    public estadoPedidoId?: number,
    public idPedidos?: IDetallePedidoMySuffix[],
    public clientId?: number
  ) {}
}
