import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { MultishopSharedModule } from 'app/shared';
import {
  ProductMySuffixComponent,
  ProductMySuffixDetailComponent,
  ProductMySuffixUpdateComponent,
  ProductMySuffixDeletePopupComponent,
  ProductMySuffixDeleteDialogComponent,
  productRoute,
  productPopupRoute
} from './';

const ENTITY_STATES = [...productRoute, ...productPopupRoute];

@NgModule({
  imports: [MultishopSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ProductMySuffixComponent,
    ProductMySuffixDetailComponent,
    ProductMySuffixUpdateComponent,
    ProductMySuffixDeleteDialogComponent,
    ProductMySuffixDeletePopupComponent
  ],
  entryComponents: [
    ProductMySuffixComponent,
    ProductMySuffixUpdateComponent,
    ProductMySuffixDeleteDialogComponent,
    ProductMySuffixDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MultishopProductMySuffixModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
