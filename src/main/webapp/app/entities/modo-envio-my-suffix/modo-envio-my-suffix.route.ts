import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IModoEnvioMySuffix, ModoEnvioMySuffix } from 'app/shared/model/modo-envio-my-suffix.model';
import { ModoEnvioMySuffixService } from './modo-envio-my-suffix.service';
import { ModoEnvioMySuffixComponent } from './modo-envio-my-suffix.component';
import { ModoEnvioMySuffixDetailComponent } from './modo-envio-my-suffix-detail.component';
import { ModoEnvioMySuffixUpdateComponent } from './modo-envio-my-suffix-update.component';

@Injectable({ providedIn: 'root' })
export class ModoEnvioMySuffixResolve implements Resolve<IModoEnvioMySuffix> {
  constructor(private service: ModoEnvioMySuffixService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IModoEnvioMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((modoEnvio: HttpResponse<ModoEnvioMySuffix>) => {
          if (modoEnvio.body) {
            return of(modoEnvio.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ModoEnvioMySuffix());
  }
}

export const modoEnvioRoute: Routes = [
  {
    path: '',
    component: ModoEnvioMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'multishopApp.modoEnvio.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ModoEnvioMySuffixDetailComponent,
    resolve: {
      modoEnvio: ModoEnvioMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'multishopApp.modoEnvio.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ModoEnvioMySuffixUpdateComponent,
    resolve: {
      modoEnvio: ModoEnvioMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'multishopApp.modoEnvio.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ModoEnvioMySuffixUpdateComponent,
    resolve: {
      modoEnvio: ModoEnvioMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'multishopApp.modoEnvio.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
