import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPedidoMySuffix } from 'app/shared/model/pedido-my-suffix.model';
import { PedidoMySuffixService } from './pedido-my-suffix.service';
import { PedidoMySuffixDeleteDialogComponent } from './pedido-my-suffix-delete-dialog.component';

@Component({
  selector: 'jhi-pedido-my-suffix',
  templateUrl: './pedido-my-suffix.component.html'
})
export class PedidoMySuffixComponent implements OnInit, OnDestroy {
  pedidos?: IPedidoMySuffix[];
  eventSubscriber?: Subscription;

  constructor(protected pedidoService: PedidoMySuffixService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.pedidoService.query().subscribe((res: HttpResponse<IPedidoMySuffix[]>) => {
      this.pedidos = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPedidos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPedidoMySuffix): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPedidos(): void {
    this.eventSubscriber = this.eventManager.subscribe('pedidoListModification', () => this.loadAll());
  }

  delete(pedido: IPedidoMySuffix): void {
    const modalRef = this.modalService.open(PedidoMySuffixDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.pedido = pedido;
  }
}
