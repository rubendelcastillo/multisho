import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MultishopSharedModule } from 'app/shared/shared.module';
import { EstadoPedidoMySuffixComponent } from './estado-pedido-my-suffix.component';
import { EstadoPedidoMySuffixDetailComponent } from './estado-pedido-my-suffix-detail.component';
import { EstadoPedidoMySuffixUpdateComponent } from './estado-pedido-my-suffix-update.component';
import { EstadoPedidoMySuffixDeleteDialogComponent } from './estado-pedido-my-suffix-delete-dialog.component';
import { estadoPedidoRoute } from './estado-pedido-my-suffix.route';

@NgModule({
  imports: [MultishopSharedModule, RouterModule.forChild(estadoPedidoRoute)],
  declarations: [
    EstadoPedidoMySuffixComponent,
    EstadoPedidoMySuffixDetailComponent,
    EstadoPedidoMySuffixUpdateComponent,
    EstadoPedidoMySuffixDeleteDialogComponent
  ],
  entryComponents: [EstadoPedidoMySuffixDeleteDialogComponent]
})
export class MultishopEstadoPedidoMySuffixModule {}
