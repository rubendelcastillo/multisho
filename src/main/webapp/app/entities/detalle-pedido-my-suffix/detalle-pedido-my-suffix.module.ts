import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { MultishopSharedModule } from 'app/shared';
import {
  DetallePedidoMySuffixComponent,
  DetallePedidoMySuffixDetailComponent,
  DetallePedidoMySuffixUpdateComponent,
  DetallePedidoMySuffixDeletePopupComponent,
  DetallePedidoMySuffixDeleteDialogComponent,
  detallePedidoRoute,
  detallePedidoPopupRoute
} from './';

const ENTITY_STATES = [...detallePedidoRoute, ...detallePedidoPopupRoute];

@NgModule({
  imports: [MultishopSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DetallePedidoMySuffixComponent,
    DetallePedidoMySuffixDetailComponent,
    DetallePedidoMySuffixUpdateComponent,
    DetallePedidoMySuffixDeleteDialogComponent,
    DetallePedidoMySuffixDeletePopupComponent
  ],
  entryComponents: [
    DetallePedidoMySuffixComponent,
    DetallePedidoMySuffixUpdateComponent,
    DetallePedidoMySuffixDeleteDialogComponent,
    DetallePedidoMySuffixDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MultishopDetallePedidoMySuffixModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
