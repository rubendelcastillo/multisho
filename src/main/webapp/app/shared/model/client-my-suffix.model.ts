import { Moment } from 'moment';
import { ILocationMySuffix } from 'app/shared/model/location-my-suffix.model';
import { IPedidoMySuffix } from 'app/shared/model/pedido-my-suffix.model';
import { DocumentType } from 'app/shared/model/enumerations/document-type.model';

export interface IClientMySuffix {
  id?: number;
  idClient?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  creationDate?: Moment;
  endDate?: number;
  documentId?: string;
  documentType?: DocumentType;
  countries?: ILocationMySuffix[];
  idClients?: IPedidoMySuffix[];
}

export class ClientMySuffix implements IClientMySuffix {
  constructor(
    public id?: number,
    public idClient?: number,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public phoneNumber?: string,
    public creationDate?: Moment,
    public endDate?: number,
    public documentId?: string,
    public documentType?: DocumentType,
    public countries?: ILocationMySuffix[],
    public idClients?: IPedidoMySuffix[]
  ) {}
}
