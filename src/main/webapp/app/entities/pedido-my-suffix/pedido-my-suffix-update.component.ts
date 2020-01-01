import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { IPedidoMySuffix, PedidoMySuffix } from 'app/shared/model/pedido-my-suffix.model';
import { PedidoMySuffixService } from './pedido-my-suffix.service';
import { IModoPagoMySuffix } from 'app/shared/model/modo-pago-my-suffix.model';
import { ModoPagoMySuffixService } from 'app/entities/modo-pago-my-suffix/modo-pago-my-suffix.service';
import { IEstadoPedidoMySuffix } from 'app/shared/model/estado-pedido-my-suffix.model';
import { EstadoPedidoMySuffixService } from 'app/entities/estado-pedido-my-suffix/estado-pedido-my-suffix.service';
import { IClientMySuffix } from 'app/shared/model/client-my-suffix.model';
import { ClientMySuffixService } from 'app/entities/client-my-suffix/client-my-suffix.service';

type SelectableEntity = IModoPagoMySuffix | IEstadoPedidoMySuffix | IClientMySuffix;

@Component({
  selector: 'jhi-pedido-my-suffix-update',
  templateUrl: './pedido-my-suffix-update.component.html'
})
export class PedidoMySuffixUpdateComponent implements OnInit {
  isSaving = false;

  modopagos: IModoPagoMySuffix[] = [];

  estadopedidos: IEstadoPedidoMySuffix[] = [];

  clients: IClientMySuffix[] = [];
  fechaPedidoDp: any;
  fechaNotificacionDp: any;
  fechaConfirmacionDp: any;

  editForm = this.fb.group({
    id: [],
    idPedido: [],
    idClient: [],
    idTienda: [],
    fechaPedido: [],
    fechaNotificacion: [],
    idModoPago: [],
    cargoPorCoste: [],
    gastosEnvio: [],
    idModoEnvio: [],
    jobTitle: [],
    idEstado: [],
    fechaConfirmacion: [],
    modoPagoId: [],
    estadoPedidoId: [],
    clientId: []
  });

  constructor(
    protected pedidoService: PedidoMySuffixService,
    protected modoPagoService: ModoPagoMySuffixService,
    protected estadoPedidoService: EstadoPedidoMySuffixService,
    protected clientService: ClientMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pedido }) => {
      this.updateForm(pedido);

      this.modoPagoService
        .query({ filter: 'pedido-is-null' })
        .pipe(
          map((res: HttpResponse<IModoPagoMySuffix[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IModoPagoMySuffix[]) => {
          if (!pedido.modoPagoId) {
            this.modopagos = resBody;
          } else {
            this.modoPagoService
              .find(pedido.modoPagoId)
              .pipe(
                map((subRes: HttpResponse<IModoPagoMySuffix>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IModoPagoMySuffix[]) => {
                this.modopagos = concatRes;
              });
          }
        });

      this.estadoPedidoService
        .query({ filter: 'pedido-is-null' })
        .pipe(
          map((res: HttpResponse<IEstadoPedidoMySuffix[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IEstadoPedidoMySuffix[]) => {
          if (!pedido.estadoPedidoId) {
            this.estadopedidos = resBody;
          } else {
            this.estadoPedidoService
              .find(pedido.estadoPedidoId)
              .pipe(
                map((subRes: HttpResponse<IEstadoPedidoMySuffix>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IEstadoPedidoMySuffix[]) => {
                this.estadopedidos = concatRes;
              });
          }
        });

      this.clientService
        .query()
        .pipe(
          map((res: HttpResponse<IClientMySuffix[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IClientMySuffix[]) => (this.clients = resBody));
    });
  }

  updateForm(pedido: IPedidoMySuffix): void {
    this.editForm.patchValue({
      id: pedido.id,
      idPedido: pedido.idPedido,
      idClient: pedido.idClient,
      idTienda: pedido.idTienda,
      fechaPedido: pedido.fechaPedido,
      fechaNotificacion: pedido.fechaNotificacion,
      idModoPago: pedido.idModoPago,
      cargoPorCoste: pedido.cargoPorCoste,
      gastosEnvio: pedido.gastosEnvio,
      idModoEnvio: pedido.idModoEnvio,
      jobTitle: pedido.jobTitle,
      idEstado: pedido.idEstado,
      fechaConfirmacion: pedido.fechaConfirmacion,
      modoPagoId: pedido.modoPagoId,
      estadoPedidoId: pedido.estadoPedidoId,
      clientId: pedido.clientId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
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
      id: this.editForm.get(['id'])!.value,
      idPedido: this.editForm.get(['idPedido'])!.value,
      idClient: this.editForm.get(['idClient'])!.value,
      idTienda: this.editForm.get(['idTienda'])!.value,
      fechaPedido: this.editForm.get(['fechaPedido'])!.value,
      fechaNotificacion: this.editForm.get(['fechaNotificacion'])!.value,
      idModoPago: this.editForm.get(['idModoPago'])!.value,
      cargoPorCoste: this.editForm.get(['cargoPorCoste'])!.value,
      gastosEnvio: this.editForm.get(['gastosEnvio'])!.value,
      idModoEnvio: this.editForm.get(['idModoEnvio'])!.value,
      jobTitle: this.editForm.get(['jobTitle'])!.value,
      idEstado: this.editForm.get(['idEstado'])!.value,
      fechaConfirmacion: this.editForm.get(['fechaConfirmacion'])!.value,
      modoPagoId: this.editForm.get(['modoPagoId'])!.value,
      estadoPedidoId: this.editForm.get(['estadoPedidoId'])!.value,
      clientId: this.editForm.get(['clientId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPedidoMySuffix>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
