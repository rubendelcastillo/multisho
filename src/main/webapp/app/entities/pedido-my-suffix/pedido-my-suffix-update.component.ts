import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IPedidoMySuffix, PedidoMySuffix } from 'app/shared/model/pedido-my-suffix.model';
import { PedidoMySuffixService } from './pedido-my-suffix.service';
import { IClientMySuffix } from 'app/shared/model/client-my-suffix.model';
import { ClientMySuffixService } from 'app/entities/client-my-suffix';
import { IModoEnvioMySuffix } from 'app/shared/model/modo-envio-my-suffix.model';
import { ModoEnvioMySuffixService } from 'app/entities/modo-envio-my-suffix';
import { IModoPagoMySuffix } from 'app/shared/model/modo-pago-my-suffix.model';
import { ModoPagoMySuffixService } from 'app/entities/modo-pago-my-suffix';
import { IEstadoPedidoMySuffix } from 'app/shared/model/estado-pedido-my-suffix.model';
import { EstadoPedidoMySuffixService } from 'app/entities/estado-pedido-my-suffix';

@Component({
  selector: 'jhi-pedido-my-suffix-update',
  templateUrl: './pedido-my-suffix-update.component.html'
})
export class PedidoMySuffixUpdateComponent implements OnInit {
  isSaving: boolean;

  clients: IClientMySuffix[];

  modoenvios: IModoEnvioMySuffix[];

  modopagos: IModoPagoMySuffix[];

  estadopedidos: IEstadoPedidoMySuffix[];
  fechaPedidoDp: any;
  fechaNotificacionDp: any;
  fechaConfirmacionDp: any;

  editForm = this.fb.group({
    id: [],
    fechaPedido: [],
    fechaNotificacion: [],
    idModoPago: [],
    cargoPorCoste: [],
    gastosEnvio: [],
    idModoEnvio: [],
    jobTitle: [],
    fechaConfirmacion: [],
    clientId: [],
    modoEnvioId: [],
    modoPagoId: [],
    estadoPedidoId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected pedidoService: PedidoMySuffixService,
    protected clientService: ClientMySuffixService,
    protected modoEnvioService: ModoEnvioMySuffixService,
    protected modoPagoService: ModoPagoMySuffixService,
    protected estadoPedidoService: EstadoPedidoMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ pedido }) => {
      this.updateForm(pedido);
    });
    this.clientService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IClientMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IClientMySuffix[]>) => response.body)
      )
      .subscribe((res: IClientMySuffix[]) => (this.clients = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.modoEnvioService
      .query({ filter: 'pedido-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IModoEnvioMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IModoEnvioMySuffix[]>) => response.body)
      )
      .subscribe(
        (res: IModoEnvioMySuffix[]) => {
          if (!!this.editForm.get('modoEnvioId').value) {
            this.modoenvios = res;
          } else {
            this.modoEnvioService
              .find(this.editForm.get('modoEnvioId').value)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IModoEnvioMySuffix>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IModoEnvioMySuffix>) => subResponse.body)
              )
              .subscribe(
                (subRes: IModoEnvioMySuffix) => (this.modoenvios = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.modoPagoService
      .query({ filter: 'pedido-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IModoPagoMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IModoPagoMySuffix[]>) => response.body)
      )
      .subscribe(
        (res: IModoPagoMySuffix[]) => {
          if (!!this.editForm.get('modoPagoId').value) {
            this.modopagos = res;
          } else {
            this.modoPagoService
              .find(this.editForm.get('modoPagoId').value)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IModoPagoMySuffix>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IModoPagoMySuffix>) => subResponse.body)
              )
              .subscribe(
                (subRes: IModoPagoMySuffix) => (this.modopagos = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.estadoPedidoService
      .query({ filter: 'pedido-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IEstadoPedidoMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEstadoPedidoMySuffix[]>) => response.body)
      )
      .subscribe(
        (res: IEstadoPedidoMySuffix[]) => {
          if (!!this.editForm.get('estadoPedidoId').value) {
            this.estadopedidos = res;
          } else {
            this.estadoPedidoService
              .find(this.editForm.get('estadoPedidoId').value)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IEstadoPedidoMySuffix>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IEstadoPedidoMySuffix>) => subResponse.body)
              )
              .subscribe(
                (subRes: IEstadoPedidoMySuffix) => (this.estadopedidos = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(pedido: IPedidoMySuffix) {
    this.editForm.patchValue({
      id: pedido.id,
      fechaPedido: pedido.fechaPedido,
      fechaNotificacion: pedido.fechaNotificacion,
      idModoPago: pedido.idModoPago,
      cargoPorCoste: pedido.cargoPorCoste,
      gastosEnvio: pedido.gastosEnvio,
      idModoEnvio: pedido.idModoEnvio,
      jobTitle: pedido.jobTitle,
      fechaConfirmacion: pedido.fechaConfirmacion,
      clientId: pedido.clientId,
      modoEnvioId: pedido.modoEnvioId,
      modoPagoId: pedido.modoPagoId,
      estadoPedidoId: pedido.estadoPedidoId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const pedido = this.createFromForm();
    if (pedido.id !== undefined) {
      this.subscribeToSaveResponse(this.pedidoService.update(pedido));
    } else {
      this.subscribeToSaveResponse(this.pedidoService.create(pedido));
    }
  }

  private createFromForm(): IPedidoMySuffix {
    return {
      ...new PedidoMySuffix(),
      id: this.editForm.get(['id']).value,
      fechaPedido: this.editForm.get(['fechaPedido']).value,
      fechaNotificacion: this.editForm.get(['fechaNotificacion']).value,
      idModoPago: this.editForm.get(['idModoPago']).value,
      cargoPorCoste: this.editForm.get(['cargoPorCoste']).value,
      gastosEnvio: this.editForm.get(['gastosEnvio']).value,
      idModoEnvio: this.editForm.get(['idModoEnvio']).value,
      jobTitle: this.editForm.get(['jobTitle']).value,
      fechaConfirmacion: this.editForm.get(['fechaConfirmacion']).value,
      clientId: this.editForm.get(['clientId']).value,
      modoEnvioId: this.editForm.get(['modoEnvioId']).value,
      modoPagoId: this.editForm.get(['modoPagoId']).value,
      estadoPedidoId: this.editForm.get(['estadoPedidoId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPedidoMySuffix>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackClientById(index: number, item: IClientMySuffix) {
    return item.id;
  }

  trackModoEnvioById(index: number, item: IModoEnvioMySuffix) {
    return item.id;
  }

  trackModoPagoById(index: number, item: IModoPagoMySuffix) {
    return item.id;
  }

  trackEstadoPedidoById(index: number, item: IEstadoPedidoMySuffix) {
    return item.id;
  }
}
