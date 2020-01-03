/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MultishopTestModule } from '../../../test.module';
import { DetallePedidoMySuffixComponent } from 'app/entities/detalle-pedido-my-suffix/detalle-pedido-my-suffix.component';
import { DetallePedidoMySuffixService } from 'app/entities/detalle-pedido-my-suffix/detalle-pedido-my-suffix.service';
import { DetallePedidoMySuffix } from 'app/shared/model/detalle-pedido-my-suffix.model';

describe('Component Tests', () => {
  describe('DetallePedidoMySuffix Management Component', () => {
    let comp: DetallePedidoMySuffixComponent;
    let fixture: ComponentFixture<DetallePedidoMySuffixComponent>;
    let service: DetallePedidoMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MultishopTestModule],
        declarations: [DetallePedidoMySuffixComponent],
        providers: []
      })
        .overrideTemplate(DetallePedidoMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DetallePedidoMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DetallePedidoMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DetallePedidoMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.detallePedidos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
