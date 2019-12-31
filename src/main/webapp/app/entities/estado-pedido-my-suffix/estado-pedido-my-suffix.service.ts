import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEstadoPedidoMySuffix } from 'app/shared/model/estado-pedido-my-suffix.model';

type EntityResponseType = HttpResponse<IEstadoPedidoMySuffix>;
type EntityArrayResponseType = HttpResponse<IEstadoPedidoMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class EstadoPedidoMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/estado-pedidos';

  constructor(protected http: HttpClient) {}

  create(estadoPedido: IEstadoPedidoMySuffix): Observable<EntityResponseType> {
    return this.http.post<IEstadoPedidoMySuffix>(this.resourceUrl, estadoPedido, { observe: 'response' });
  }

  update(estadoPedido: IEstadoPedidoMySuffix): Observable<EntityResponseType> {
    return this.http.put<IEstadoPedidoMySuffix>(this.resourceUrl, estadoPedido, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEstadoPedidoMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEstadoPedidoMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
