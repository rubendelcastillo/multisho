import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MultishopSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [MultishopSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [MultishopSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MultishopSharedModule {
  static forRoot() {
    return {
      ngModule: MultishopSharedModule
    };
  }
}
