/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MultishopTestModule } from '../../../test.module';
import { DetallePedidoMySuffixDetailComponent } from 'app/entities/detalle-pedido-my-suffix/detalle-pedido-my-suffix-detail.component';
import { DetallePedidoMySuffix } from 'app/shared/model/detalle-pedido-my-suffix.model';

describe('Component Tests', () => {
  describe('DetallePedidoMySuffix Management Detail Component', () => {
    let comp: DetallePedidoMySuffixDetailComponent;
    let fixture: ComponentFixture<DetallePedidoMySuffixDetailComponent>;
    const route = ({ data: of({ detallePedido: new DetallePedidoMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MultishopTestModule],
        declarations: [DetallePedidoMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DetallePedidoMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DetallePedidoMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.detallePedido).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
