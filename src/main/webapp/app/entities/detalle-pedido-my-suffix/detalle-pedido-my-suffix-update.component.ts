import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IDetallePedidoMySuffix, DetallePedidoMySuffix } from 'app/shared/model/detalle-pedido-my-suffix.model';
import { DetallePedidoMySuffixService } from './detalle-pedido-my-suffix.service';
import { IPedidoMySuffix } from 'app/shared/model/pedido-my-suffix.model';
import { PedidoMySuffixService } from 'app/entities/pedido-my-suffix/pedido-my-suffix.service';

@Component({
  selector: 'jhi-detalle-pedido-my-suffix-update',
  templateUrl: './detalle-pedido-my-suffix-update.component.html'
})
export class DetallePedidoMySuffixUpdateComponent implements OnInit {
  isSaving = false;

  pedidos: IPedidoMySuffix[] = [];

  editForm = this.fb.group({
    id: [],
    idPedido: [],
    idProducto: [],
    precioCompra: [],
    pedidoId: []
  });

  constructor(
    protected detallePedidoService: DetallePedidoMySuffixService,
    protected pedidoService: PedidoMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ detallePedido }) => {
      this.updateForm(detallePedido);

      this.pedidoService
        .query()
        .pipe(
          map((res: HttpResponse<IPedidoMySuffix[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IPedidoMySuffix[]) => (this.pedidos = resBody));
    });
  }

  updateForm(detallePedido: IDetallePedidoMySuffix): void {
    this.editForm.patchValue({
      id: detallePedido.id,
      idPedido: detallePedido.idPedido,
      idProducto: detallePedido.idProducto,
      precioCompra: detallePedido.precioCompra,
      pedidoId: detallePedido.pedidoId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const detallePedido = this.createFromForm();
    if (detallePedido.id !== undefined) {
      this.subscribeToSaveResponse(this.detallePedidoService.update(detallePedido));
    } else {
      this.subscribeToSaveResponse(this.detallePedidoService.create(detallePedido));
    }
  }

  private createFromForm(): IDetallePedidoMySuffix {
    return {
      ...new DetallePedidoMySuffix(),
      id: this.editForm.get(['id'])!.value,
      idPedido: this.editForm.get(['idPedido'])!.value,
      idProducto: this.editForm.get(['idProducto'])!.value,
      precioCompra: this.editForm.get(['precioCompra'])!.value,
      pedidoId: this.editForm.get(['pedidoId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDetallePedidoMySuffix>>): void {
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

  trackById(index: number, item: IPedidoMySuffix): any {
    return item.id;
  }
}
