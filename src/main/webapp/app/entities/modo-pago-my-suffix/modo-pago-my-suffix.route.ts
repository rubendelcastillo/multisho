import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IModoPagoMySuffix, ModoPagoMySuffix } from 'app/shared/model/modo-pago-my-suffix.model';
import { ModoPagoMySuffixService } from './modo-pago-my-suffix.service';
import { ModoPagoMySuffixComponent } from './modo-pago-my-suffix.component';
import { ModoPagoMySuffixDetailComponent } from './modo-pago-my-suffix-detail.component';
import { ModoPagoMySuffixUpdateComponent } from './modo-pago-my-suffix-update.component';

@Injectable({ providedIn: 'root' })
export class ModoPagoMySuffixResolve implements Resolve<IModoPagoMySuffix> {
  constructor(private service: ModoPagoMySuffixService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IModoPagoMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((modoPago: HttpResponse<ModoPagoMySuffix>) => {
          if (modoPago.body) {
            return of(modoPago.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ModoPagoMySuffix());
  }
}

export const modoPagoRoute: Routes = [
  {
    path: '',
    component: ModoPagoMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'multishopApp.modoPago.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ModoPagoMySuffixDetailComponent,
    resolve: {
      modoPago: ModoPagoMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'multishopApp.modoPago.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ModoPagoMySuffixUpdateComponent,
    resolve: {
      modoPago: ModoPagoMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'multishopApp.modoPago.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ModoPagoMySuffixUpdateComponent,
    resolve: {
      modoPago: ModoPagoMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'multishopApp.modoPago.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
