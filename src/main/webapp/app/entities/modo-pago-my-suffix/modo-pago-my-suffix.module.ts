import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MultishopSharedModule } from 'app/shared/shared.module';
import { ModoPagoMySuffixComponent } from './modo-pago-my-suffix.component';
import { ModoPagoMySuffixDetailComponent } from './modo-pago-my-suffix-detail.component';
import { ModoPagoMySuffixUpdateComponent } from './modo-pago-my-suffix-update.component';
import { ModoPagoMySuffixDeleteDialogComponent } from './modo-pago-my-suffix-delete-dialog.component';
import { modoPagoRoute } from './modo-pago-my-suffix.route';

@NgModule({
  imports: [MultishopSharedModule, RouterModule.forChild(modoPagoRoute)],
  declarations: [
    ModoPagoMySuffixComponent,
    ModoPagoMySuffixDetailComponent,
    ModoPagoMySuffixUpdateComponent,
    ModoPagoMySuffixDeleteDialogComponent
  ],
  entryComponents: [ModoPagoMySuffixDeleteDialogComponent]
})
export class MultishopModoPagoMySuffixModule {}
