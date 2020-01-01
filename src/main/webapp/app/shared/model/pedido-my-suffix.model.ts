import { Moment } from 'moment';
import { IDetallePedidoMySuffix } from 'app/shared/model/detalle-pedido-my-suffix.model';

export interface IPedidoMySuffix {
  id?: number;
  idPedido?: number;
  idClient?: number;
  idTienda?: number;
  fechaPedido?: Moment;
  fechaNotificacion?: Moment;
  idModoPago?: number;
  cargoPorCoste?: number;
  gastosEnvio?: number;
  idModoEnvio?: number;
  jobTitle?: string;
  idEstado?: number;
  fechaConfirmacion?: Moment;
  modoPagoId?: number;
  estadoPedidoId?: number;
  idPedidos?: IDetallePedidoMySuffix[];
  modoEnvioId?: number;
  clientId?: number;
}

export class PedidoMySuffix implements IPedidoMySuffix {
  constructor(
    public id?: number,
    public idPedido?: number,
    public idClient?: number,
    public idTienda?: number,
    public fechaPedido?: Moment,
    public fechaNotificacion?: Moment,
    public idModoPago?: number,
    public cargoPorCoste?: number,
    public gastosEnvio?: number,
    public idModoEnvio?: number,
    public jobTitle?: string,
    public idEstado?: number,
    public fechaConfirmacion?: Moment,
    public modoPagoId?: number,
    public estadoPedidoId?: number,
    public idPedidos?: IDetallePedidoMySuffix[],
    public modoEnvioId?: number,
    public clientId?: number
  ) {}
}
