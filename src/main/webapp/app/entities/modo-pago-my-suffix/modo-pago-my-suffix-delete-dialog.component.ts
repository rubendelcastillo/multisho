import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IModoPagoMySuffix } from 'app/shared/model/modo-pago-my-suffix.model';
import { ModoPagoMySuffixService } from './modo-pago-my-suffix.service';

@Component({
  templateUrl: './modo-pago-my-suffix-delete-dialog.component.html'
})
export class ModoPagoMySuffixDeleteDialogComponent {
  modoPago?: IModoPagoMySuffix;

  constructor(
    protected modoPagoService: ModoPagoMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.modoPagoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('modoPagoListModification');
      this.activeModal.close();
    });
  }
}
