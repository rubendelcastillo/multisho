import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDetallePedidoMySuffix } from 'app/shared/model/detalle-pedido-my-suffix.model';
import { DetallePedidoMySuffixService } from './detalle-pedido-my-suffix.service';

@Component({
  templateUrl: './detalle-pedido-my-suffix-delete-dialog.component.html'
})
export class DetallePedidoMySuffixDeleteDialogComponent {
  detallePedido?: IDetallePedidoMySuffix;

  constructor(
    protected detallePedidoService: DetallePedidoMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.detallePedidoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('detallePedidoListModification');
      this.activeModal.close();
    });
  }
}
