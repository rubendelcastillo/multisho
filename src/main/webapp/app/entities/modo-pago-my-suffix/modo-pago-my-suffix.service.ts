import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IModoPagoMySuffix } from 'app/shared/model/modo-pago-my-suffix.model';

type EntityResponseType = HttpResponse<IModoPagoMySuffix>;
type EntityArrayResponseType = HttpResponse<IModoPagoMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class ModoPagoMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/modo-pagos';

  constructor(protected http: HttpClient) {}

  create(modoPago: IModoPagoMySuffix): Observable<EntityResponseType> {
    return this.http.post<IModoPagoMySuffix>(this.resourceUrl, modoPago, { observe: 'response' });
  }

  update(modoPago: IModoPagoMySuffix): Observable<EntityResponseType> {
    return this.http.put<IModoPagoMySuffix>(this.resourceUrl, modoPago, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IModoPagoMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IModoPagoMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
