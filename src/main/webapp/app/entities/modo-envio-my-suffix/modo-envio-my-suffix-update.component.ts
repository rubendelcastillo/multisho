import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IModoEnvioMySuffix, ModoEnvioMySuffix } from 'app/shared/model/modo-envio-my-suffix.model';
import { ModoEnvioMySuffixService } from './modo-envio-my-suffix.service';
import { IPedidoMySuffix } from 'app/shared/model/pedido-my-suffix.model';
import { PedidoMySuffixService } from 'app/entities/pedido-my-suffix/pedido-my-suffix.service';

@Component({
  selector: 'jhi-modo-envio-my-suffix-update',
  templateUrl: './modo-envio-my-suffix-update.component.html'
})
export class ModoEnvioMySuffixUpdateComponent implements OnInit {
  isSaving = false;

  pedidos: IPedidoMySuffix[] = [];

  editForm = this.fb.group({
    id: [],
    modoEnvio: [null, [Validators.required]],
    pedidoId: []
  });

  constructor(
    protected modoEnvioService: ModoEnvioMySuffixService,
    protected pedidoService: PedidoMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ modoEnvio }) => {
      this.updateForm(modoEnvio);

      this.pedidoService
        .query({ filter: 'modoenvio-is-null' })
        .pipe(
          map((res: HttpResponse<IPedidoMySuffix[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IPedidoMySuffix[]) => {
          if (!modoEnvio.pedidoId) {
            this.pedidos = resBody;
          } else {
            this.pedidoService
              .find(modoEnvio.pedidoId)
              .pipe(
                map((subRes: HttpResponse<IPedidoMySuffix>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IPedidoMySuffix[]) => {
                this.pedidos = concatRes;
              });
          }
        });
    });
  }

  updateForm(modoEnvio: IModoEnvioMySuffix): void {
    this.editForm.patchValue({
      id: modoEnvio.id,
      modoEnvio: modoEnvio.modoEnvio,
      pedidoId: modoEnvio.pedidoId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const modoEnvio = this.createFromForm();
    if (modoEnvio.id !== undefined) {
      this.subscribeToSaveResponse(this.modoEnvioService.update(modoEnvio));
    } else {
      this.subscribeToSaveResponse(this.modoEnvioService.create(modoEnvio));
    }
  }

  private createFromForm(): IModoEnvioMySuffix {
    return {
      ...new ModoEnvioMySuffix(),
      id: this.editForm.get(['id'])!.value,
      modoEnvio: this.editForm.get(['modoEnvio'])!.value,
      pedidoId: this.editForm.get(['pedidoId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IModoEnvioMySuffix>>): void {
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
