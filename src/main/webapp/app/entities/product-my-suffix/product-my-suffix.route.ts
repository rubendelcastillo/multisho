import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ProductMySuffix } from 'app/shared/model/product-my-suffix.model';
import { ProductMySuffixService } from './product-my-suffix.service';
import { ProductMySuffixComponent } from './product-my-suffix.component';
import { ProductMySuffixDetailComponent } from './product-my-suffix-detail.component';
import { ProductMySuffixUpdateComponent } from './product-my-suffix-update.component';
import { ProductMySuffixDeletePopupComponent } from './product-my-suffix-delete-dialog.component';
import { IProductMySuffix } from 'app/shared/model/product-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class ProductMySuffixResolve implements Resolve<IProductMySuffix> {
  constructor(private service: ProductMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProductMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ProductMySuffix>) => response.ok),
        map((product: HttpResponse<ProductMySuffix>) => product.body)
      );
    }
    return of(new ProductMySuffix());
  }
}

export const productRoute: Routes = [
  {
    path: '',
    component: ProductMySuffixComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'multishopApp.product.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProductMySuffixDetailComponent,
    resolve: {
      product: ProductMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'multishopApp.product.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProductMySuffixUpdateComponent,
    resolve: {
      product: ProductMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'multishopApp.product.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProductMySuffixUpdateComponent,
    resolve: {
      product: ProductMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'multishopApp.product.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const productPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ProductMySuffixDeletePopupComponent,
    resolve: {
      product: ProductMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'multishopApp.product.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
