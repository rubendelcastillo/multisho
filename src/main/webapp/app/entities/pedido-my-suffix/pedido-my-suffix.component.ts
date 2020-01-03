import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPedidoMySuffix } from 'app/shared/model/pedido-my-suffix.model';
import { AccountService } from 'app/core';
import { PedidoMySuffixService } from './pedido-my-suffix.service';

@Component({
  selector: 'jhi-pedido-my-suffix',
  templateUrl: './pedido-my-suffix.component.html'
})
export class PedidoMySuffixComponent implements OnInit, OnDestroy {
  pedidos: IPedidoMySuffix[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected pedidoService: PedidoMySuffixService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.pedidoService
      .query()
      .pipe(
        filter((res: HttpResponse<IPedidoMySuffix[]>) => res.ok),
        map((res: HttpResponse<IPedidoMySuffix[]>) => res.body)
      )
      .subscribe(
        (res: IPedidoMySuffix[]) => {
          this.pedidos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPedidos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPedidoMySuffix) {
    return item.id;
  }

  registerChangeInPedidos() {
    this.eventSubscriber = this.eventManager.subscribe('pedidoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
