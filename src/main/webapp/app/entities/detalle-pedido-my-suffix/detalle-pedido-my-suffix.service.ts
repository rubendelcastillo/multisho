import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDetallePedidoMySuffix } from 'app/shared/model/detalle-pedido-my-suffix.model';

type EntityResponseType = HttpResponse<IDetallePedidoMySuffix>;
type EntityArrayResponseType = HttpResponse<IDetallePedidoMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class DetallePedidoMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/detalle-pedidos';

  constructor(protected http: HttpClient) {}

  create(detallePedido: IDetallePedidoMySuffix): Observable<EntityResponseType> {
    return this.http.post<IDetallePedidoMySuffix>(this.resourceUrl, detallePedido, { observe: 'response' });
  }

  update(detallePedido: IDetallePedidoMySuffix): Observable<EntityResponseType> {
    return this.http.put<IDetallePedidoMySuffix>(this.resourceUrl, detallePedido, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDetallePedidoMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDetallePedidoMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
