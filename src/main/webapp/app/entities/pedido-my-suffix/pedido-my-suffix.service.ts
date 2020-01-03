import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
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

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(pedido: IPedidoMySuffix): IPedidoMySuffix {
    const copy: IPedidoMySuffix = Object.assign({}, pedido, {
      fechaPedido: pedido.fechaPedido != null && pedido.fechaPedido.isValid() ? pedido.fechaPedido.format(DATE_FORMAT) : null,
      fechaNotificacion:
        pedido.fechaNotificacion != null && pedido.fechaNotificacion.isValid() ? pedido.fechaNotificacion.format(DATE_FORMAT) : null,
      fechaConfirmacion:
        pedido.fechaConfirmacion != null && pedido.fechaConfirmacion.isValid() ? pedido.fechaConfirmacion.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaPedido = res.body.fechaPedido != null ? moment(res.body.fechaPedido) : null;
      res.body.fechaNotificacion = res.body.fechaNotificacion != null ? moment(res.body.fechaNotificacion) : null;
      res.body.fechaConfirmacion = res.body.fechaConfirmacion != null ? moment(res.body.fechaConfirmacion) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((pedido: IPedidoMySuffix) => {
        pedido.fechaPedido = pedido.fechaPedido != null ? moment(pedido.fechaPedido) : null;
        pedido.fechaNotificacion = pedido.fechaNotificacion != null ? moment(pedido.fechaNotificacion) : null;
        pedido.fechaConfirmacion = pedido.fechaConfirmacion != null ? moment(pedido.fechaConfirmacion) : null;
      });
    }
    return res;
  }
}
