import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDetallePedidoMySuffix } from 'app/shared/model/detalle-pedido-my-suffix.model';
import { DetallePedidoMySuffixService } from './detalle-pedido-my-suffix.service';
import { DetallePedidoMySuffixDeleteDialogComponent } from './detalle-pedido-my-suffix-delete-dialog.component';

@Component({
  selector: 'jhi-detalle-pedido-my-suffix',
  templateUrl: './detalle-pedido-my-suffix.component.html'
})
export class DetallePedidoMySuffixComponent implements OnInit, OnDestroy {
  detallePedidos?: IDetallePedidoMySuffix[];
  eventSubscriber?: Subscription;

  constructor(
    protected detallePedidoService: DetallePedidoMySuffixService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.detallePedidoService.query().subscribe((res: HttpResponse<IDetallePedidoMySuffix[]>) => {
      this.detallePedidos = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDetallePedidos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDetallePedidoMySuffix): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDetallePedidos(): void {
    this.eventSubscriber = this.eventManager.subscribe('detallePedidoListModification', () => this.loadAll());
  }

  delete(detallePedido: IDetallePedidoMySuffix): void {
    const modalRef = this.modalService.open(DetallePedidoMySuffixDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.detallePedido = detallePedido;
  }
}
