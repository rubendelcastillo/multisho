import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEstadoPedidoMySuffix, EstadoPedidoMySuffix } from 'app/shared/model/estado-pedido-my-suffix.model';
import { EstadoPedidoMySuffixService } from './estado-pedido-my-suffix.service';

@Component({
  selector: 'jhi-estado-pedido-my-suffix-update',
  templateUrl: './estado-pedido-my-suffix-update.component.html'
})
export class EstadoPedidoMySuffixUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    idEstado: [],
    descripcion: []
  });

  constructor(
    protected estadoPedidoService: EstadoPedidoMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ estadoPedido }) => {
      this.updateForm(estadoPedido);
    });
  }

  updateForm(estadoPedido: IEstadoPedidoMySuffix): void {
    this.editForm.patchValue({
      id: estadoPedido.id,
      idEstado: estadoPedido.idEstado,
      descripcion: estadoPedido.descripcion
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const estadoPedido = this.createFromForm();
    if (estadoPedido.id !== undefined) {
      this.subscribeToSaveResponse(this.estadoPedidoService.update(estadoPedido));
    } else {
      this.subscribeToSaveResponse(this.estadoPedidoService.create(estadoPedido));
    }
  }

  private createFromForm(): IEstadoPedidoMySuffix {
    return {
      ...new EstadoPedidoMySuffix(),
      id: this.editForm.get(['id'])!.value,
      idEstado: this.editForm.get(['idEstado'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEstadoPedidoMySuffix>>): void {
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
}
