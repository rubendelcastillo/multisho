import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IModoPagoMySuffix } from 'app/shared/model/modo-pago-my-suffix.model';

@Component({
  selector: 'jhi-modo-pago-my-suffix-detail',
  templateUrl: './modo-pago-my-suffix-detail.component.html'
})
export class ModoPagoMySuffixDetailComponent implements OnInit {
  modoPago: IModoPagoMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ modoPago }) => {
      this.modoPago = modoPago;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
