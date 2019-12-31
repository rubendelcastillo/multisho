import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MultishopTestModule } from '../../../test.module';
import { EstadoPedidoMySuffixDetailComponent } from 'app/entities/estado-pedido-my-suffix/estado-pedido-my-suffix-detail.component';
import { EstadoPedidoMySuffix } from 'app/shared/model/estado-pedido-my-suffix.model';

describe('Component Tests', () => {
  describe('EstadoPedidoMySuffix Management Detail Component', () => {
    let comp: EstadoPedidoMySuffixDetailComponent;
    let fixture: ComponentFixture<EstadoPedidoMySuffixDetailComponent>;
    const route = ({ data: of({ estadoPedido: new EstadoPedidoMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MultishopTestModule],
        declarations: [EstadoPedidoMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EstadoPedidoMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EstadoPedidoMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load estadoPedido on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.estadoPedido).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
