import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IDetallePedidoMySuffix, DetallePedidoMySuffix } from 'app/shared/model/detalle-pedido-my-suffix.model';
import { DetallePedidoMySuffixService } from './detalle-pedido-my-suffix.service';
import { IPedidoMySuffix } from 'app/shared/model/pedido-my-suffix.model';
import { PedidoMySuffixService } from 'app/entities/pedido-my-suffix';
import { IProductMySuffix } from 'app/shared/model/product-my-suffix.model';
import { ProductMySuffixService } from 'app/entities/product-my-suffix';

@Component({
  selector: 'jhi-detalle-pedido-my-suffix-update',
  templateUrl: './detalle-pedido-my-suffix-update.component.html'
})
export class DetallePedidoMySuffixUpdateComponent implements OnInit {
  isSaving: boolean;

  pedidos: IPedidoMySuffix[];

  products: IProductMySuffix[];

  editForm = this.fb.group({
    id: [],
    idPedido: [],
    idProducto: [],
    precioCompra: [],
    pedidoId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected detallePedidoService: DetallePedidoMySuffixService,
    protected pedidoService: PedidoMySuffixService,
    protected productService: ProductMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ detallePedido }) => {
      this.updateForm(detallePedido);
    });
    this.pedidoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPedidoMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPedidoMySuffix[]>) => response.body)
      )
      .subscribe((res: IPedidoMySuffix[]) => (this.pedidos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.productService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IProductMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProductMySuffix[]>) => response.body)
      )
      .subscribe((res: IProductMySuffix[]) => (this.products = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(detallePedido: IDetallePedidoMySuffix) {
    this.editForm.patchValue({
      id: detallePedido.id,
      idPedido: detallePedido.idPedido,
      idProducto: detallePedido.idProducto,
      precioCompra: detallePedido.precioCompra,
      pedidoId: detallePedido.pedidoId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
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
      id: this.editForm.get(['id']).value,
      idPedido: this.editForm.get(['idPedido']).value,
      idProducto: this.editForm.get(['idProducto']).value,
      precioCompra: this.editForm.get(['precioCompra']).value,
      pedidoId: this.editForm.get(['pedidoId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDetallePedidoMySuffix>>) {
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

  trackPedidoById(index: number, item: IPedidoMySuffix) {
    return item.id;
  }

  trackProductById(index: number, item: IProductMySuffix) {
    return item.id;
  }
}
