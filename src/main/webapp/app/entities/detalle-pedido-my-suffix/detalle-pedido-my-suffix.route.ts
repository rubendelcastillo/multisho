import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DetallePedidoMySuffix } from 'app/shared/model/detalle-pedido-my-suffix.model';
import { DetallePedidoMySuffixService } from './detalle-pedido-my-suffix.service';
import { DetallePedidoMySuffixComponent } from './detalle-pedido-my-suffix.component';
import { DetallePedidoMySuffixDetailComponent } from './detalle-pedido-my-suffix-detail.component';
import { DetallePedidoMySuffixUpdateComponent } from './detalle-pedido-my-suffix-update.component';
import { DetallePedidoMySuffixDeletePopupComponent } from './detalle-pedido-my-suffix-delete-dialog.component';
import { IDetallePedidoMySuffix } from 'app/shared/model/detalle-pedido-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class DetallePedidoMySuffixResolve implements Resolve<IDetallePedidoMySuffix> {
  constructor(private service: DetallePedidoMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDetallePedidoMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<DetallePedidoMySuffix>) => response.ok),
        map((detallePedido: HttpResponse<DetallePedidoMySuffix>) => detallePedido.body)
      );
    }
    return of(new DetallePedidoMySuffix());
  }
}

export const detallePedidoRoute: Routes = [
  {
    path: '',
    component: DetallePedidoMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'multishopApp.detallePedido.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DetallePedidoMySuffixDetailComponent,
    resolve: {
      detallePedido: DetallePedidoMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'multishopApp.detallePedido.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DetallePedidoMySuffixUpdateComponent,
    resolve: {
      detallePedido: DetallePedidoMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'multishopApp.detallePedido.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DetallePedidoMySuffixUpdateComponent,
    resolve: {
      detallePedido: DetallePedidoMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'multishopApp.detallePedido.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const detallePedidoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: DetallePedidoMySuffixDeletePopupComponent,
    resolve: {
      detallePedido: DetallePedidoMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'multishopApp.detallePedido.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
