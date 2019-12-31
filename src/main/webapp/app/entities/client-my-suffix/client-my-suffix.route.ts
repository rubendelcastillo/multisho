import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IClientMySuffix, ClientMySuffix } from 'app/shared/model/client-my-suffix.model';
import { ClientMySuffixService } from './client-my-suffix.service';
import { ClientMySuffixComponent } from './client-my-suffix.component';
import { ClientMySuffixDetailComponent } from './client-my-suffix-detail.component';
import { ClientMySuffixUpdateComponent } from './client-my-suffix-update.component';

@Injectable({ providedIn: 'root' })
export class ClientMySuffixResolve implements Resolve<IClientMySuffix> {
  constructor(private service: ClientMySuffixService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IClientMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((client: HttpResponse<ClientMySuffix>) => {
          if (client.body) {
            return of(client.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ClientMySuffix());
  }
}

export const clientRoute: Routes = [
  {
    path: '',
    component: ClientMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'multishopApp.client.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ClientMySuffixDetailComponent,
    resolve: {
      client: ClientMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'multishopApp.client.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ClientMySuffixUpdateComponent,
    resolve: {
      client: ClientMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'multishopApp.client.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ClientMySuffixUpdateComponent,
    resolve: {
      client: ClientMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'multishopApp.client.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
