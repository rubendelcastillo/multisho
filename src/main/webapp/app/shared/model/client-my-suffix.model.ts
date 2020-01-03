import { Moment } from 'moment';
import { ILocationMySuffix } from 'app/shared/model/location-my-suffix.model';
import { IPedidoMySuffix } from 'app/shared/model/pedido-my-suffix.model';

export const enum DocumentType {
  PASSPORT = 'PASSPORT',
  IDENTITY_CARD = 'IDENTITY_CARD',
  SOCIAL_SECURITY_NUMBER = 'SOCIAL_SECURITY_NUMBER',
  NIF = 'NIF'
}

export interface IClientMySuffix {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  creationDate?: Moment;
  endDate?: Moment;
  documentId?: string;
  documentType?: DocumentType;
  countries?: ILocationMySuffix[];
  idClients?: IPedidoMySuffix[];
}

export class ClientMySuffix implements IClientMySuffix {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public phoneNumber?: string,
    public creationDate?: Moment,
    public endDate?: Moment,
    public documentId?: string,
    public documentType?: DocumentType,
    public countries?: ILocationMySuffix[],
    public idClients?: IPedidoMySuffix[]
  ) {}
}
