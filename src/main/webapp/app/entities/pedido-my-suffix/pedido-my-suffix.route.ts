import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPedidoMySuffix, PedidoMySuffix } from 'app/shared/model/pedido-my-suffix.model';
import { PedidoMySuffixService } from './pedido-my-suffix.service';
import { PedidoMySuffixComponent } from './pedido-my-suffix.component';
import { PedidoMySuffixDetailComponent } from './pedido-my-suffix-detail.component';
import { PedidoMySuffixUpdateComponent } from './pedido-my-suffix-update.component';

@Injectable({ providedIn: 'root' })
export class PedidoMySuffixResolve implements Resolve<IPedidoMySuffix> {
  constructor(private service: PedidoMySuffixService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPedidoMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((pedido: HttpResponse<PedidoMySuffix>) => {
          if (pedido.body) {
            return of(pedido.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
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
