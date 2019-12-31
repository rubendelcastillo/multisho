import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRegionMySuffix } from 'app/shared/model/region-my-suffix.model';
import { RegionMySuffixService } from './region-my-suffix.service';
import { RegionMySuffixDeleteDialogComponent } from './region-my-suffix-delete-dialog.component';

@Component({
  selector: 'jhi-region-my-suffix',
  templateUrl: './region-my-suffix.component.html'
})
export class RegionMySuffixComponent implements OnInit, OnDestroy {
  regions?: IRegionMySuffix[];
  eventSubscriber?: Subscription;

  constructor(protected regionService: RegionMySuffixService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.regionService.query().subscribe((res: HttpResponse<IRegionMySuffix[]>) => {
      this.regions = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRegions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRegionMySuffix): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInRegions(): void {
    this.eventSubscriber = this.eventManager.subscribe('regionListModification', () => this.loadAll());
  }

  delete(region: IRegionMySuffix): void {
    const modalRef = this.modalService.open(RegionMySuffixDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.region = region;
  }
}
