import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { MultishopSharedModule } from 'app/shared';
import {
  PedidoMySuffixComponent,
  PedidoMySuffixDetailComponent,
  PedidoMySuffixUpdateComponent,
  PedidoMySuffixDeletePopupComponent,
  PedidoMySuffixDeleteDialogComponent,
  pedidoRoute,
  pedidoPopupRoute
} from './';

const ENTITY_STATES = [...pedidoRoute, ...pedidoPopupRoute];

@NgModule({
  imports: [MultishopSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PedidoMySuffixComponent,
    PedidoMySuffixDetailComponent,
    PedidoMySuffixUpdateComponent,
    PedidoMySuffixDeleteDialogComponent,
    PedidoMySuffixDeletePopupComponent
  ],
  entryComponents: [
    PedidoMySuffixComponent,
    PedidoMySuffixUpdateComponent,
    PedidoMySuffixDeleteDialogComponent,
    PedidoMySuffixDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MultishopPedidoMySuffixModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
