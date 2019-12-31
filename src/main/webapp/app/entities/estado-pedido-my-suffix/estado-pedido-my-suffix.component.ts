import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEstadoPedidoMySuffix } from 'app/shared/model/estado-pedido-my-suffix.model';
import { EstadoPedidoMySuffixService } from './estado-pedido-my-suffix.service';
import { EstadoPedidoMySuffixDeleteDialogComponent } from './estado-pedido-my-suffix-delete-dialog.component';

@Component({
  selector: 'jhi-estado-pedido-my-suffix',
  templateUrl: './estado-pedido-my-suffix.component.html'
})
export class EstadoPedidoMySuffixComponent implements OnInit, OnDestroy {
  estadoPedidos?: IEstadoPedidoMySuffix[];
  eventSubscriber?: Subscription;

  constructor(
    protected estadoPedidoService: EstadoPedidoMySuffixService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.estadoPedidoService.query().subscribe((res: HttpResponse<IEstadoPedidoMySuffix[]>) => {
      this.estadoPedidos = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEstadoPedidos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEstadoPedidoMySuffix): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEstadoPedidos(): void {
    this.eventSubscriber = this.eventManager.subscribe('estadoPedidoListModification', () => this.loadAll());
  }

  delete(estadoPedido: IEstadoPedidoMySuffix): void {
    const modalRef = this.modalService.open(EstadoPedidoMySuffixDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.estadoPedido = estadoPedido;
  }
}
