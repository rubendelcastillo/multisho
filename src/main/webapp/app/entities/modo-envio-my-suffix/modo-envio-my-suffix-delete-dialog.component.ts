import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IModoEnvioMySuffix } from 'app/shared/model/modo-envio-my-suffix.model';
import { ModoEnvioMySuffixService } from './modo-envio-my-suffix.service';

@Component({
  templateUrl: './modo-envio-my-suffix-delete-dialog.component.html'
})
export class ModoEnvioMySuffixDeleteDialogComponent {
  modoEnvio?: IModoEnvioMySuffix;

  constructor(
    protected modoEnvioService: ModoEnvioMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.modoEnvioService.delete(id).subscribe(() => {
      this.eventManager.broadcast('modoEnvioListModification');
      this.activeModal.close();
    });
  }
}
