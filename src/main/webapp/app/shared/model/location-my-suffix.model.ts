export interface ILocationMySuffix {
  id?: number;
  streetAddress?: string;
  complementaryInfo?: string;
  number?: string;
  mainDoor?: string;
  flatDoor?: string;
  level?: string;
  stair?: string;
  postalCode?: string;
  city?: string;
  stateProvince?: string;
  countryId?: number;
  clientId?: number;
}

export class LocationMySuffix implements ILocationMySuffix {
  constructor(
    public id?: number,
    public streetAddress?: string,
    public complementaryInfo?: string,
    public number?: string,
    public mainDoor?: string,
    public flatDoor?: string,
    public level?: string,
    public stair?: string,
    public postalCode?: string,
    public city?: string,
    public stateProvince?: string,
    public countryId?: number,
    public clientId?: number
  ) {}
}
