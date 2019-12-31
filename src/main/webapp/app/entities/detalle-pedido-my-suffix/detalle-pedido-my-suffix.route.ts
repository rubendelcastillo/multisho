import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDetallePedidoMySuffix, DetallePedidoMySuffix } from 'app/shared/model/detalle-pedido-my-suffix.model';
import { DetallePedidoMySuffixService } from './detalle-pedido-my-suffix.service';
import { DetallePedidoMySuffixComponent } from './detalle-pedido-my-suffix.component';
import { DetallePedidoMySuffixDetailComponent } from './detalle-pedido-my-suffix-detail.component';
import { DetallePedidoMySuffixUpdateComponent } from './detalle-pedido-my-suffix-update.component';

@Injectable({ providedIn: 'root' })
export class DetallePedidoMySuffixResolve implements Resolve<IDetallePedidoMySuffix> {
  constructor(private service: DetallePedidoMySuffixService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDetallePedidoMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((detallePedido: HttpResponse<DetallePedidoMySuffix>) => {
          if (detallePedido.body) {
            return of(detallePedido.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
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
