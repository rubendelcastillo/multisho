import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { PedidoMySuffixService } from 'app/entities/pedido-my-suffix/pedido-my-suffix.service';
import { IPedidoMySuffix, PedidoMySuffix } from 'app/shared/model/pedido-my-suffix.model';

describe('Service Tests', () => {
  describe('PedidoMySuffix Service', () => {
    let injector: TestBed;
    let service: PedidoMySuffixService;
    let httpMock: HttpTestingController;
    let elemDefault: IPedidoMySuffix;
    let expectedResult: IPedidoMySuffix | IPedidoMySuffix[] | boolean | null;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(PedidoMySuffixService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new PedidoMySuffix(0, 0, 0, 0, currentDate, currentDate, 0, 0, 0, 0, 'AAAAAAA', 0, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fechaPedido: currentDate.format(DATE_FORMAT),
            fechaNotificacion: currentDate.format(DATE_FORMAT),
            fechaConfirmacion: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a PedidoMySuffix', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fechaPedido: currentDate.format(DATE_FORMAT),
            fechaNotificacion: currentDate.format(DATE_FORMAT),
            fechaConfirmacion: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fechaPedido: currentDate,
            fechaNotificacion: currentDate,
            fechaConfirmacion: currentDate
          },
          returnedFromService
        );
        service
          .create(new PedidoMySuffix())
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a PedidoMySuffix', () => {
        const returnedFromService = Object.assign(
          {
            idPedido: 1,
            idClient: 1,
            idTienda: 1,
            fechaPedido: currentDate.format(DATE_FORMAT),
            fechaNotificacion: currentDate.format(DATE_FORMAT),
            idModoPago: 1,
            cargoPorCoste: 1,
            gastosEnvio: 1,
            idModoEnvio: 1,
            jobTitle: 'BBBBBB',
            idEstado: 1,
            fechaConfirmacion: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaPedido: currentDate,
            fechaNotificacion: currentDate,
            fechaConfirmacion: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of PedidoMySuffix', () => {
        const returnedFromService = Object.assign(
          {
            idPedido: 1,
            idClient: 1,
            idTienda: 1,
            fechaPedido: currentDate.format(DATE_FORMAT),
            fechaNotificacion: currentDate.format(DATE_FORMAT),
            idModoPago: 1,
            cargoPorCoste: 1,
            gastosEnvio: 1,
            idModoEnvio: 1,
            jobTitle: 'BBBBBB',
            idEstado: 1,
            fechaConfirmacion: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            fechaPedido: currentDate,
            fechaNotificacion: currentDate,
            fechaConfirmacion: currentDate
          },
          returnedFromService
        );
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

      it('should delete a PedidoMySuffix', () => {
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
