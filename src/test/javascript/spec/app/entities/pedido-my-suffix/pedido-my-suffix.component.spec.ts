/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MultishopTestModule } from '../../../test.module';
import { PedidoMySuffixComponent } from 'app/entities/pedido-my-suffix/pedido-my-suffix.component';
import { PedidoMySuffixService } from 'app/entities/pedido-my-suffix/pedido-my-suffix.service';
import { PedidoMySuffix } from 'app/shared/model/pedido-my-suffix.model';

describe('Component Tests', () => {
  describe('PedidoMySuffix Management Component', () => {
    let comp: PedidoMySuffixComponent;
    let fixture: ComponentFixture<PedidoMySuffixComponent>;
    let service: PedidoMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MultishopTestModule],
        declarations: [PedidoMySuffixComponent],
        providers: []
      })
        .overrideTemplate(PedidoMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PedidoMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PedidoMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PedidoMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.pedidos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
