import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PedidoMySuffix } from 'app/shared/model/pedido-my-suffix.model';
import { PedidoMySuffixService } from './pedido-my-suffix.service';
import { PedidoMySuffixComponent } from './pedido-my-suffix.component';
import { PedidoMySuffixDetailComponent } from './pedido-my-suffix-detail.component';
import { PedidoMySuffixUpdateComponent } from './pedido-my-suffix-update.component';
import { PedidoMySuffixDeletePopupComponent } from './pedido-my-suffix-delete-dialog.component';
import { IPedidoMySuffix } from 'app/shared/model/pedido-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class PedidoMySuffixResolve implements Resolve<IPedidoMySuffix> {
  constructor(private service: PedidoMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPedidoMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PedidoMySuffix>) => response.ok),
        map((pedido: HttpResponse<PedidoMySuffix>) => pedido.body)
      );
    }
    return of(new PedidoMySuffix());
  }
}

export const pedidoRoute: Routes = [
  {
    path: '',
    component: PedidoMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'multishopApp.pedido.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PedidoMySuffixDetailComponent,
    resolve: {
      pedido: PedidoMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'multishopApp.pedido.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PedidoMySuffixUpdateComponent,
    resolve: {
      pedido: PedidoMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'multishopApp.pedido.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PedidoMySuffixUpdateComponent,
    resolve: {
      pedido: PedidoMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'multishopApp.pedido.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const pedidoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PedidoMySuffixDeletePopupComponent,
    resolve: {
      pedido: PedidoMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'multishopApp.pedido.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
