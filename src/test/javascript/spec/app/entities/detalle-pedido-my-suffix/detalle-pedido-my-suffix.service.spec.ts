import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import { DetallePedidoMySuffixService } from 'app/entities/detalle-pedido-my-suffix/detalle-pedido-my-suffix.service';
import { IDetallePedidoMySuffix, DetallePedidoMySuffix } from 'app/shared/model/detalle-pedido-my-suffix.model';

describe('Service Tests', () => {
  describe('DetallePedidoMySuffix Service', () => {
    let injector: TestBed;
    let service: DetallePedidoMySuffixService;
    let httpMock: HttpTestingController;
    let elemDefault: IDetallePedidoMySuffix;
    let expectedResult: IDetallePedidoMySuffix | IDetallePedidoMySuffix[] | boolean | null;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(DetallePedidoMySuffixService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new DetallePedidoMySuffix(0, 0, 0, 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a DetallePedidoMySuffix', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .create(new DetallePedidoMySuffix())
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a DetallePedidoMySuffix', () => {
        const returnedFromService = Object.assign(
          {
            idPedido: 1,
            idProducto: 1,
            precioCompra: 1
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of DetallePedidoMySuffix', () => {
        const returnedFromService = Object.assign(
          {
            idPedido: 1,
            idProducto: 1,
            precioCompra: 1
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .query()
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a DetallePedidoMySuffix', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
