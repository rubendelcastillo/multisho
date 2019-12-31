import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'region-my-suffix',
        loadChildren: () => import('./region-my-suffix/region-my-suffix.module').then(m => m.MultishopRegionMySuffixModule)
      },
      {
        path: 'country-my-suffix',
        loadChildren: () => import('./country-my-suffix/country-my-suffix.module').then(m => m.MultishopCountryMySuffixModule)
      },
      {
        path: 'location-my-suffix',
        loadChildren: () => import('./location-my-suffix/location-my-suffix.module').then(m => m.MultishopLocationMySuffixModule)
      },
      {
        path: 'modo-envio-my-suffix',
        loadChildren: () => import('./modo-envio-my-suffix/modo-envio-my-suffix.module').then(m => m.MultishopModoEnvioMySuffixModule)
      },
      {
        path: 'product-my-suffix',
        loadChildren: () => import('./product-my-suffix/product-my-suffix.module').then(m => m.MultishopProductMySuffixModule)
      },
      {
        path: 'client-my-suffix',
        loadChildren: () => import('./client-my-suffix/client-my-suffix.module').then(m => m.MultishopClientMySuffixModule)
      },
      {
        path: 'modo-pago-my-suffix',
        loadChildren: () => import('./modo-pago-my-suffix/modo-pago-my-suffix.module').then(m => m.MultishopModoPagoMySuffixModule)
      },
      {
        path: 'pedido-my-suffix',
        loadChildren: () => import('./pedido-my-suffix/pedido-my-suffix.module').then(m => m.MultishopPedidoMySuffixModule)
      },
      {
        path: 'detalle-pedido-my-suffix',
        loadChildren: () =>
          import('./detalle-pedido-my-suffix/detalle-pedido-my-suffix.module').then(m => m.MultishopDetallePedidoMySuffixModule)
      },
      {
        path: 'estado-pedido-my-suffix',
        loadChildren: () =>
          import('./estado-pedido-my-suffix/estado-pedido-my-suffix.module').then(m => m.MultishopEstadoPedidoMySuffixModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class MultishopEntityModule {}
