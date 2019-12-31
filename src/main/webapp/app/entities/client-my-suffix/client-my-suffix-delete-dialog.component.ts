import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IClientMySuffix } from 'app/shared/model/client-my-suffix.model';
import { ClientMySuffixService } from './client-my-suffix.service';

@Component({
  templateUrl: './client-my-suffix-delete-dialog.component.html'
})
export class ClientMySuffixDeleteDialogComponent {
  client?: IClientMySuffix;

  constructor(
    protected clientService: ClientMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.clientService.delete(id).subscribe(() => {
      this.eventManager.broadcast('clientListModification');
      this.activeModal.close();
    });
  }
}
