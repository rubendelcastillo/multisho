import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IModoPagoMySuffix } from 'app/shared/model/modo-pago-my-suffix.model';
import { ModoPagoMySuffixService } from './modo-pago-my-suffix.service';
import { ModoPagoMySuffixDeleteDialogComponent } from './modo-pago-my-suffix-delete-dialog.component';

@Component({
  selector: 'jhi-modo-pago-my-suffix',
  templateUrl: './modo-pago-my-suffix.component.html'
})
export class ModoPagoMySuffixComponent implements OnInit, OnDestroy {
  modoPagos?: IModoPagoMySuffix[];
  eventSubscriber?: Subscription;

  constructor(
    protected modoPagoService: ModoPagoMySuffixService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.modoPagoService.query().subscribe((res: HttpResponse<IModoPagoMySuffix[]>) => {
      this.modoPagos = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInModoPagos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IModoPagoMySuffix): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInModoPagos(): void {
    this.eventSubscriber = this.eventManager.subscribe('modoPagoListModification', () => this.loadAll());
  }

  delete(modoPago: IModoPagoMySuffix): void {
    const modalRef = this.modalService.open(ModoPagoMySuffixDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.modoPago = modoPago;
  }
}
