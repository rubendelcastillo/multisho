import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEstadoPedidoMySuffix, EstadoPedidoMySuffix } from 'app/shared/model/estado-pedido-my-suffix.model';
import { EstadoPedidoMySuffixService } from './estado-pedido-my-suffix.service';
import { EstadoPedidoMySuffixComponent } from './estado-pedido-my-suffix.component';
import { EstadoPedidoMySuffixDetailComponent } from './estado-pedido-my-suffix-detail.component';
import { EstadoPedidoMySuffixUpdateComponent } from './estado-pedido-my-suffix-update.component';

@Injectable({ providedIn: 'root' })
export class EstadoPedidoMySuffixResolve implements Resolve<IEstadoPedidoMySuffix> {
  constructor(private service: EstadoPedidoMySuffixService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEstadoPedidoMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((estadoPedido: HttpResponse<EstadoPedidoMySuffix>) => {
          if (estadoPedido.body) {
            return of(estadoPedido.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EstadoPedidoMySuffix());
  }
}

export const estadoPedidoRoute: Routes = [
  {
    path: '',
    component: EstadoPedidoMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'multishopApp.estadoPedido.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EstadoPedidoMySuffixDetailComponent,
    resolve: {
      estadoPedido: EstadoPedidoMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'multishopApp.estadoPedido.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EstadoPedidoMySuffixUpdateComponent,
    resolve: {
      estadoPedido: EstadoPedidoMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'multishopApp.estadoPedido.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EstadoPedidoMySuffixUpdateComponent,
    resolve: {
      estadoPedido: EstadoPedidoMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'multishopApp.estadoPedido.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
