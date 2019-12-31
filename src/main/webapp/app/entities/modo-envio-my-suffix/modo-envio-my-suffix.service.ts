import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IModoEnvioMySuffix } from 'app/shared/model/modo-envio-my-suffix.model';

type EntityResponseType = HttpResponse<IModoEnvioMySuffix>;
type EntityArrayResponseType = HttpResponse<IModoEnvioMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class ModoEnvioMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/modo-envios';

  constructor(protected http: HttpClient) {}

  create(modoEnvio: IModoEnvioMySuffix): Observable<EntityResponseType> {
    return this.http.post<IModoEnvioMySuffix>(this.resourceUrl, modoEnvio, { observe: 'response' });
  }

  update(modoEnvio: IModoEnvioMySuffix): Observable<EntityResponseType> {
    return this.http.put<IModoEnvioMySuffix>(this.resourceUrl, modoEnvio, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IModoEnvioMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IModoEnvioMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
