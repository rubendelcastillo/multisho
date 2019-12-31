import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductMySuffix } from 'app/shared/model/product-my-suffix.model';

@Component({
  selector: 'jhi-product-my-suffix-detail',
  templateUrl: './product-my-suffix-detail.component.html'
})
export class ProductMySuffixDetailComponent implements OnInit {
  product: IProductMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ product }) => {
      this.product = product;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
