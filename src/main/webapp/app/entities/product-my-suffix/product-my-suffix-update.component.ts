import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IProductMySuffix, ProductMySuffix } from 'app/shared/model/product-my-suffix.model';
import { ProductMySuffixService } from './product-my-suffix.service';
import { IDetallePedidoMySuffix } from 'app/shared/model/detalle-pedido-my-suffix.model';
import { DetallePedidoMySuffixService } from 'app/entities/detalle-pedido-my-suffix/detalle-pedido-my-suffix.service';

@Component({
  selector: 'jhi-product-my-suffix-update',
  templateUrl: './product-my-suffix-update.component.html'
})
export class ProductMySuffixUpdateComponent implements OnInit {
  isSaving = false;

  detallepedidos: IDetallePedidoMySuffix[] = [];

  editForm = this.fb.group({
    id: [],
    title: [],
    description: [],
    stock: [],
    precioConIva: [],
    detallePedidoId: []
  });

  constructor(
    protected productService: ProductMySuffixService,
    protected detallePedidoService: DetallePedidoMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ product }) => {
      this.updateForm(product);

      this.detallePedidoService
        .query({ filter: 'product-is-null' })
        .pipe(
          map((res: HttpResponse<IDetallePedidoMySuffix[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IDetallePedidoMySuffix[]) => {
          if (!product.detallePedidoId) {
            this.detallepedidos = resBody;
          } else {
            this.detallePedidoService
              .find(product.detallePedidoId)
              .pipe(
                map((subRes: HttpResponse<IDetallePedidoMySuffix>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IDetallePedidoMySuffix[]) => {
                this.detallepedidos = concatRes;
              });
          }
        });
    });
  }

  updateForm(product: IProductMySuffix): void {
    this.editForm.patchValue({
      id: product.id,
      title: product.title,
      description: product.description,
      stock: product.stock,
      precioConIva: product.precioConIva,
      detallePedidoId: product.detallePedidoId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
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
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      description: this.editForm.get(['description'])!.value,
      stock: this.editForm.get(['stock'])!.value,
      precioConIva: this.editForm.get(['precioConIva'])!.value,
      detallePedidoId: this.editForm.get(['detallePedidoId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductMySuffix>>): void {
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

  trackById(index: number, item: IDetallePedidoMySuffix): any {
    return item.id;
  }
}
