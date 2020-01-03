import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IProductMySuffix, ProductMySuffix } from 'app/shared/model/product-my-suffix.model';
import { ProductMySuffixService } from './product-my-suffix.service';
import { IDetallePedidoMySuffix } from 'app/shared/model/detalle-pedido-my-suffix.model';
import { DetallePedidoMySuffixService } from 'app/entities/detalle-pedido-my-suffix';

@Component({
  selector: 'jhi-product-my-suffix-update',
  templateUrl: './product-my-suffix-update.component.html'
})
export class ProductMySuffixUpdateComponent implements OnInit {
  isSaving: boolean;

  detallepedidos: IDetallePedidoMySuffix[];

  editForm = this.fb.group({
    id: [],
    title: [],
    description: [],
    stock: [],
    precioConIva: [],
    detallePedidoId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected productService: ProductMySuffixService,
    protected detallePedidoService: DetallePedidoMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ product }) => {
      this.updateForm(product);
    });
    this.detallePedidoService
      .query({ filter: 'product-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IDetallePedidoMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDetallePedidoMySuffix[]>) => response.body)
      )
      .subscribe(
        (res: IDetallePedidoMySuffix[]) => {
          if (!!this.editForm.get('detallePedidoId').value) {
            this.detallepedidos = res;
          } else {
            this.detallePedidoService
              .find(this.editForm.get('detallePedidoId').value)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IDetallePedidoMySuffix>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IDetallePedidoMySuffix>) => subResponse.body)
              )
              .subscribe(
                (subRes: IDetallePedidoMySuffix) => (this.detallepedidos = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(product: IProductMySuffix) {
    this.editForm.patchValue({
      id: product.id,
      title: product.title,
      description: product.description,
      stock: product.stock,
      precioConIva: product.precioConIva,
      detallePedidoId: product.detallePedidoId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const product = this.createFromForm();
    if (product.id !== undefined) {
      this.subscribeToSaveResponse(this.productService.update(product));
    } else {
      this.subscribeToSaveResponse(this.productService.create(product));
    }
  }

  private createFromForm(): IProductMySuffix {
    return {
      ...new ProductMySuffix(),
      id: this.editForm.get(['id']).value,
      title: this.editForm.get(['title']).value,
      description: this.editForm.get(['description']).value,
      stock: this.editForm.get(['stock']).value,
      precioConIva: this.editForm.get(['precioConIva']).value,
      detallePedidoId: this.editForm.get(['detallePedidoId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductMySuffix>>) {
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

  trackDetallePedidoById(index: number, item: IDetallePedidoMySuffix) {
    return item.id;
  }
}
