import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDetallePedidoMySuffix } from 'app/shared/model/detalle-pedido-my-suffix.model';
import { AccountService } from 'app/core';
import { DetallePedidoMySuffixService } from './detalle-pedido-my-suffix.service';

@Component({
  selector: 'jhi-detalle-pedido-my-suffix',
  templateUrl: './detalle-pedido-my-suffix.component.html'
})
export class DetallePedidoMySuffixComponent implements OnInit, OnDestroy {
  detallePedidos: IDetallePedidoMySuffix[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected detallePedidoService: DetallePedidoMySuffixService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.detallePedidoService
      .query()
      .pipe(
        filter((res: HttpResponse<IDetallePedidoMySuffix[]>) => res.ok),
        map((res: HttpResponse<IDetallePedidoMySuffix[]>) => res.body)
      )
      .subscribe(
        (res: IDetallePedidoMySuffix[]) => {
          this.detallePedidos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInDetallePedidos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDetallePedidoMySuffix) {
    return item.id;
  }

  registerChangeInDetallePedidos() {
    this.eventSubscriber = this.eventManager.subscribe('detallePedidoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
