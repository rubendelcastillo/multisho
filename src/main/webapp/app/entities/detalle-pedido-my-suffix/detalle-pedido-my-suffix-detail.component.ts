import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDetallePedidoMySuffix } from 'app/shared/model/detalle-pedido-my-suffix.model';

@Component({
  selector: 'jhi-detalle-pedido-my-suffix-detail',
  templateUrl: './detalle-pedido-my-suffix-detail.component.html'
})
export class DetallePedidoMySuffixDetailComponent implements OnInit {
  detallePedido: IDetallePedidoMySuffix;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ detallePedido }) => {
      this.detallePedido = detallePedido;
    });
  }

  previousState() {
    window.history.back();
  }
}
