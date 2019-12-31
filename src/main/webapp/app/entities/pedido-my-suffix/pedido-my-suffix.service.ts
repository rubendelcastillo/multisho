import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPedidoMySuffix } from 'app/shared/model/pedido-my-suffix.model';

type EntityResponseType = HttpResponse<IPedidoMySuffix>;
type EntityArrayResponseType = HttpResponse<IPedidoMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class PedidoMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/pedidos';

  constructor(protected http: HttpClient) {}

  create(pedido: IPedidoMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pedido);
    return this.http
      .post<IPedidoMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(pedido: IPedidoMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pedido);
    return this.http
      .put<IPedidoMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPedidoMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPedidoMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(pedido: IPedidoMySuffix): IPedidoMySuffix {
    const copy: IPedidoMySuffix = Object.assign({}, pedido, {
      fechaPedido: pedido.fechaPedido && pedido.fechaPedido.isValid() ? pedido.fechaPedido.format(DATE_FORMAT) : undefined,
      fechaNotificacion:
        pedido.fechaNotificacion && pedido.fechaNotificacion.isValid() ? pedido.fechaNotificacion.format(DATE_FORMAT) : undefined,
      fechaConfirmacion:
        pedido.fechaConfirmacion && pedido.fechaConfirmacion.isValid() ? pedido.fechaConfirmacion.format(DATE_FORMAT) : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaPedido = res.body.fechaPedido ? moment(res.body.fechaPedido) : undefined;
      res.body.fechaNotificacion = res.body.fechaNotificacion ? moment(res.body.fechaNotificacion) : undefined;
      res.body.fechaConfirmacion = res.body.fechaConfirmacion ? moment(res.body.fechaConfirmacion) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((pedido: IPedidoMySuffix) => {
        pedido.fechaPedido = pedido.fechaPedido ? moment(pedido.fechaPedido) : undefined;
        pedido.fechaNotificacion = pedido.fechaNotificacion ? moment(pedido.fechaNotificacion) : undefined;
        pedido.fechaConfirmacion = pedido.fechaConfirmacion ? moment(pedido.fechaConfirmacion) : undefined;
      });
    }
    return res;
  }
}
