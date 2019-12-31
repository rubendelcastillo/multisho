import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPedidoMySuffix } from 'app/shared/model/pedido-my-suffix.model';
import { PedidoMySuffixService } from './pedido-my-suffix.service';

@Component({
  templateUrl: './pedido-my-suffix-delete-dialog.component.html'
})
export class PedidoMySuffixDeleteDialogComponent {
  pedido?: IPedidoMySuffix;

  constructor(
    protected pedidoService: PedidoMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.pedidoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('pedidoListModification');
      this.activeModal.close();
    });
  }
}
