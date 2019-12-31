import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IModoEnvioMySuffix } from 'app/shared/model/modo-envio-my-suffix.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ModoEnvioMySuffixService } from './modo-envio-my-suffix.service';
import { ModoEnvioMySuffixDeleteDialogComponent } from './modo-envio-my-suffix-delete-dialog.component';

@Component({
  selector: 'jhi-modo-envio-my-suffix',
  templateUrl: './modo-envio-my-suffix.component.html'
})
export class ModoEnvioMySuffixComponent implements OnInit, OnDestroy {
  modoEnvios: IModoEnvioMySuffix[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected modoEnvioService: ModoEnvioMySuffixService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.modoEnvios = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.modoEnvioService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IModoEnvioMySuffix[]>) => this.paginateModoEnvios(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.modoEnvios = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInModoEnvios();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IModoEnvioMySuffix): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInModoEnvios(): void {
    this.eventSubscriber = this.eventManager.subscribe('modoEnvioListModification', () => this.reset());
  }

  delete(modoEnvio: IModoEnvioMySuffix): void {
    const modalRef = this.modalService.open(ModoEnvioMySuffixDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.modoEnvio = modoEnvio;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateModoEnvios(data: IModoEnvioMySuffix[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.modoEnvios.push(data[i]);
      }
    }
  }
}
