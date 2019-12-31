import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductMySuffix } from 'app/shared/model/product-my-suffix.model';
import { ProductMySuffixService } from './product-my-suffix.service';

@Component({
  templateUrl: './product-my-suffix-delete-dialog.component.html'
})
export class ProductMySuffixDeleteDialogComponent {
  product?: IProductMySuffix;

  constructor(
    protected productService: ProductMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.productService.delete(id).subscribe(() => {
      this.eventManager.broadcast('productListModification');
      this.activeModal.close();
    });
  }
}
