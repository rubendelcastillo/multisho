import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IClientMySuffix } from 'app/shared/model/client-my-suffix.model';
import { AccountService } from 'app/core';
import { ClientMySuffixService } from './client-my-suffix.service';

@Component({
  selector: 'jhi-client-my-suffix',
  templateUrl: './client-my-suffix.component.html'
})
export class ClientMySuffixComponent implements OnInit, OnDestroy {
  clients: IClientMySuffix[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected clientService: ClientMySuffixService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.clientService
      .query()
      .pipe(
        filter((res: HttpResponse<IClientMySuffix[]>) => res.ok),
        map((res: HttpResponse<IClientMySuffix[]>) => res.body)
      )
      .subscribe(
        (res: IClientMySuffix[]) => {
          this.clients = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInClients();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IClientMySuffix) {
    return item.id;
  }

  registerChangeInClients() {
    this.eventSubscriber = this.eventManager.subscribe('clientListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
