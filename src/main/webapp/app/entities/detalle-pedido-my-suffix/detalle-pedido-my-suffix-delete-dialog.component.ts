import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDetallePedidoMySuffix } from 'app/shared/model/detalle-pedido-my-suffix.model';
import { DetallePedidoMySuffixService } from './detalle-pedido-my-suffix.service';

@Component({
  selector: 'jhi-detalle-pedido-my-suffix-delete-dialog',
  templateUrl: './detalle-pedido-my-suffix-delete-dialog.component.html'
})
export class DetallePedidoMySuffixDeleteDialogComponent {
  detallePedido: IDetallePedidoMySuffix;

  constructor(
    protected detallePedidoService: DetallePedidoMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.detallePedidoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'detallePedidoListModification',
        content: 'Deleted an detallePedido'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-detalle-pedido-my-suffix-delete-popup',
  template: ''
})
export class DetallePedidoMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ detallePedido }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(DetallePedidoMySuffixDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.detallePedido = detallePedido;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/detalle-pedido-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/detalle-pedido-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
