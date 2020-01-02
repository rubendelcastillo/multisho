import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IClientMySuffix } from 'app/shared/model/client-my-suffix.model';

type EntityResponseType = HttpResponse<IClientMySuffix>;
type EntityArrayResponseType = HttpResponse<IClientMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class ClientMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/clients';

  constructor(protected http: HttpClient) {}

  create(client: IClientMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(client);
    return this.http
      .post<IClientMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(client: IClientMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(client);
    return this.http
      .put<IClientMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IClientMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IClientMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(client: IClientMySuffix): IClientMySuffix {
    const copy: IClientMySuffix = Object.assign({}, client, {
      creationDate: client.creationDate && client.creationDate.isValid() ? client.creationDate.toJSON() : undefined,
      endDate: client.endDate && client.endDate.isValid() ? client.endDate.format(DATE_FORMAT) : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.creationDate = res.body.creationDate ? moment(res.body.creationDate) : undefined;
      res.body.endDate = res.body.endDate ? moment(res.body.endDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((client: IClientMySuffix) => {
        client.creationDate = client.creationDate ? moment(client.creationDate) : undefined;
        client.endDate = client.endDate ? moment(client.endDate) : undefined;
      });
    }
    return res;
  }
}
