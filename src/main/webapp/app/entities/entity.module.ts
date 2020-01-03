import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'region-my-suffix',
        loadChildren: './region-my-suffix/region-my-suffix.module#MultishopRegionMySuffixModule'
      },
      {
        path: 'location-my-suffix',
        loadChildren: './location-my-suffix/location-my-suffix.module#MultishopLocationMySuffixModule'
      },
      {
        path: 'product-my-suffix',
        loadChildren: './product-my-suffix/product-my-suffix.module#MultishopProductMySuffixModule'
      },
      {
        path: 'client-my-suffix',
        loadChildren: './client-my-suffix/client-my-suffix.module#MultishopClientMySuffixModule'
      },
      {
        path: 'pedido-my-suffix',
        loadChildren: './pedido-my-suffix/pedido-my-suffix.module#MultishopPedidoMySuffixModule'
      },
      {
        path: 'detalle-pedido-my-suffix',
        loadChildren: './detalle-pedido-my-suffix/detalle-pedido-my-suffix.module#MultishopDetallePedidoMySuffixModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MultishopEntityModule {}
