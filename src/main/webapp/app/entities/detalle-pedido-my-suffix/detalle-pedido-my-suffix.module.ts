import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MultishopSharedModule } from 'app/shared/shared.module';
import { DetallePedidoMySuffixComponent } from './detalle-pedido-my-suffix.component';
import { DetallePedidoMySuffixDetailComponent } from './detalle-pedido-my-suffix-detail.component';
import { DetallePedidoMySuffixUpdateComponent } from './detalle-pedido-my-suffix-update.component';
import { DetallePedidoMySuffixDeleteDialogComponent } from './detalle-pedido-my-suffix-delete-dialog.component';
import { detallePedidoRoute } from './detalle-pedido-my-suffix.route';

@NgModule({
  imports: [MultishopSharedModule, RouterModule.forChild(detallePedidoRoute)],
  declarations: [
    DetallePedidoMySuffixComponent,
    DetallePedidoMySuffixDetailComponent,
    DetallePedidoMySuffixUpdateComponent,
    DetallePedidoMySuffixDeleteDialogComponent
  ],
  entryComponents: [DetallePedidoMySuffixDeleteDialogComponent]
})
export class MultishopDetallePedidoMySuffixModule {}
