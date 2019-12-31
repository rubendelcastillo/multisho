export interface IProductMySuffix {
  id?: number;
  title?: string;
  description?: string;
  stock?: number;
  precioConIva?: number;
  detallePedidoId?: number;
}

export class ProductMySuffix implements IProductMySuffix {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string,
    public stock?: number,
    public precioConIva?: number,
    public detallePedidoId?: number
  ) {}
}
