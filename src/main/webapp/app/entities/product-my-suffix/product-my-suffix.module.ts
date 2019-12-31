import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MultishopSharedModule } from 'app/shared/shared.module';
import { ProductMySuffixComponent } from './product-my-suffix.component';
import { ProductMySuffixDetailComponent } from './product-my-suffix-detail.component';
import { ProductMySuffixUpdateComponent } from './product-my-suffix-update.component';
import { ProductMySuffixDeleteDialogComponent } from './product-my-suffix-delete-dialog.component';
import { productRoute } from './product-my-suffix.route';

@NgModule({
  imports: [MultishopSharedModule, RouterModule.forChild(productRoute)],
  declarations: [
    ProductMySuffixComponent,
    ProductMySuffixDetailComponent,
    ProductMySuffixUpdateComponent,
    ProductMySuffixDeleteDialogComponent
  ],
  entryComponents: [ProductMySuffixDeleteDialogComponent]
})
export class MultishopProductMySuffixModule {}
