import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEstadoPedidoMySuffix } from 'app/shared/model/estado-pedido-my-suffix.model';

@Component({
  selector: 'jhi-estado-pedido-my-suffix-detail',
  templateUrl: './estado-pedido-my-suffix-detail.component.html'
})
export class EstadoPedidoMySuffixDetailComponent implements OnInit {
  estadoPedido: IEstadoPedidoMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ estadoPedido }) => {
      this.estadoPedido = estadoPedido;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
