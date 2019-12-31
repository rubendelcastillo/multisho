import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MultishopSharedModule } from 'app/shared/shared.module';
import { ClientMySuffixComponent } from './client-my-suffix.component';
import { ClientMySuffixDetailComponent } from './client-my-suffix-detail.component';
import { ClientMySuffixUpdateComponent } from './client-my-suffix-update.component';
import { ClientMySuffixDeleteDialogComponent } from './client-my-suffix-delete-dialog.component';
import { clientRoute } from './client-my-suffix.route';

@NgModule({
  imports: [MultishopSharedModule, RouterModule.forChild(clientRoute)],
  declarations: [
    ClientMySuffixComponent,
    ClientMySuffixDetailComponent,
    ClientMySuffixUpdateComponent,
    ClientMySuffixDeleteDialogComponent
  ],
  entryComponents: [ClientMySuffixDeleteDialogComponent]
})
export class MultishopClientMySuffixModule {}
