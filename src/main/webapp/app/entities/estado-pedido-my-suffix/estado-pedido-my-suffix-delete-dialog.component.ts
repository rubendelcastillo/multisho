import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEstadoPedidoMySuffix } from 'app/shared/model/estado-pedido-my-suffix.model';
import { EstadoPedidoMySuffixService } from './estado-pedido-my-suffix.service';

@Component({
  templateUrl: './estado-pedido-my-suffix-delete-dialog.component.html'
})
export class EstadoPedidoMySuffixDeleteDialogComponent {
  estadoPedido?: IEstadoPedidoMySuffix;

  constructor(
    protected estadoPedidoService: EstadoPedidoMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.estadoPedidoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('estadoPedidoListModification');
      this.activeModal.close();
    });
  }
}
