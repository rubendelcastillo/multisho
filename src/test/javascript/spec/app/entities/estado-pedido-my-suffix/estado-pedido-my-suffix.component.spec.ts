import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MultishopTestModule } from '../../../test.module';
import { EstadoPedidoMySuffixComponent } from 'app/entities/estado-pedido-my-suffix/estado-pedido-my-suffix.component';
import { EstadoPedidoMySuffixService } from 'app/entities/estado-pedido-my-suffix/estado-pedido-my-suffix.service';
import { EstadoPedidoMySuffix } from 'app/shared/model/estado-pedido-my-suffix.model';

describe('Component Tests', () => {
  describe('EstadoPedidoMySuffix Management Component', () => {
    let comp: EstadoPedidoMySuffixComponent;
    let fixture: ComponentFixture<EstadoPedidoMySuffixComponent>;
    let service: EstadoPedidoMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MultishopTestModule],
        declarations: [EstadoPedidoMySuffixComponent],
        providers: []
      })
        .overrideTemplate(EstadoPedidoMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstadoPedidoMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EstadoPedidoMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new EstadoPedidoMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.estadoPedidos && comp.estadoPedidos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
