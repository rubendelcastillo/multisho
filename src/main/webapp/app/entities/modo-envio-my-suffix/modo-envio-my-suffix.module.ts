import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MultishopSharedModule } from 'app/shared/shared.module';
import { ModoEnvioMySuffixComponent } from './modo-envio-my-suffix.component';
import { ModoEnvioMySuffixDetailComponent } from './modo-envio-my-suffix-detail.component';
import { ModoEnvioMySuffixUpdateComponent } from './modo-envio-my-suffix-update.component';
import { ModoEnvioMySuffixDeleteDialogComponent } from './modo-envio-my-suffix-delete-dialog.component';
import { modoEnvioRoute } from './modo-envio-my-suffix.route';

@NgModule({
  imports: [MultishopSharedModule, RouterModule.forChild(modoEnvioRoute)],
  declarations: [
    ModoEnvioMySuffixComponent,
    ModoEnvioMySuffixDetailComponent,
    ModoEnvioMySuffixUpdateComponent,
    ModoEnvioMySuffixDeleteDialogComponent
  ],
  entryComponents: [ModoEnvioMySuffixDeleteDialogComponent]
})
export class MultishopModoEnvioMySuffixModule {}
