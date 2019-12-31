export interface IRegionMySuffix {
  id?: number;
  regionName?: string;
  countryId?: number;
}

export class RegionMySuffix implements IRegionMySuffix {
  constructor(public id?: number, public regionName?: string, public countryId?: number) {}
}
