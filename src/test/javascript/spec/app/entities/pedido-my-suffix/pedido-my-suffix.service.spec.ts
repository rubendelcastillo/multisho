/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
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
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(PedidoMySuffixService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new PedidoMySuffix(0, currentDate, currentDate, 0, 0, 0, 0, 'AAAAAAA', currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
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
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a PedidoMySuffix', async () => {
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
          .create(new PedidoMySuffix(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a PedidoMySuffix', async () => {
        const returnedFromService = Object.assign(
          {
            fechaPedido: currentDate.format(DATE_FORMAT),
            fechaNotificacion: currentDate.format(DATE_FORMAT),
            idModoPago: 1,
            cargoPorCoste: 1,
            gastosEnvio: 1,
            idModoEnvio: 1,
            jobTitle: 'BBBBBB',
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
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of PedidoMySuffix', async () => {
        const returnedFromService = Object.assign(
          {
            fechaPedido: currentDate.format(DATE_FORMAT),
            fechaNotificacion: currentDate.format(DATE_FORMAT),
            idModoPago: 1,
            cargoPorCoste: 1,
            gastosEnvio: 1,
            idModoEnvio: 1,
            jobTitle: 'BBBBBB',
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
          .query(expected)
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

      it('should delete a PedidoMySuffix', async () => {
        const rxPromise = service.delete(123).subscribe(resp => (expectedResult = resp.ok));

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
