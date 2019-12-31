import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IClientMySuffix } from 'app/shared/model/client-my-suffix.model';
import { ClientMySuffixService } from './client-my-suffix.service';
import { ClientMySuffixDeleteDialogComponent } from './client-my-suffix-delete-dialog.component';

@Component({
  selector: 'jhi-client-my-suffix',
  templateUrl: './client-my-suffix.component.html'
})
export class ClientMySuffixComponent implements OnInit, OnDestroy {
  clients?: IClientMySuffix[];
  eventSubscriber?: Subscription;

  constructor(protected clientService: ClientMySuffixService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.clientService.query().subscribe((res: HttpResponse<IClientMySuffix[]>) => {
      this.clients = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInClients();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IClientMySuffix): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInClients(): void {
    this.eventSubscriber = this.eventManager.subscribe('clientListModification', () => this.loadAll());
  }

  delete(client: IClientMySuffix): void {
    const modalRef = this.modalService.open(ClientMySuffixDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.client = client;
  }
}
