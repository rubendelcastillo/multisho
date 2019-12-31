import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MultishopSharedModule } from 'app/shared/shared.module';
import { PedidoMySuffixComponent } from './pedido-my-suffix.component';
import { PedidoMySuffixDetailComponent } from './pedido-my-suffix-detail.component';
import { PedidoMySuffixUpdateComponent } from './pedido-my-suffix-update.component';
import { PedidoMySuffixDeleteDialogComponent } from './pedido-my-suffix-delete-dialog.component';
import { pedidoRoute } from './pedido-my-suffix.route';

@NgModule({
  imports: [MultishopSharedModule, RouterModule.forChild(pedidoRoute)],
  declarations: [
    PedidoMySuffixComponent,
    PedidoMySuffixDetailComponent,
    PedidoMySuffixUpdateComponent,
    PedidoMySuffixDeleteDialogComponent
  ],
  entryComponents: [PedidoMySuffixDeleteDialogComponent]
})
export class MultishopPedidoMySuffixModule {}
