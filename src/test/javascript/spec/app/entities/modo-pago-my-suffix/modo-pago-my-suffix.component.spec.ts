import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MultishopTestModule } from '../../../test.module';
import { ModoPagoMySuffixComponent } from 'app/entities/modo-pago-my-suffix/modo-pago-my-suffix.component';
import { ModoPagoMySuffixService } from 'app/entities/modo-pago-my-suffix/modo-pago-my-suffix.service';
import { ModoPagoMySuffix } from 'app/shared/model/modo-pago-my-suffix.model';

describe('Component Tests', () => {
  describe('ModoPagoMySuffix Management Component', () => {
    let comp: ModoPagoMySuffixComponent;
    let fixture: ComponentFixture<ModoPagoMySuffixComponent>;
    let service: ModoPagoMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MultishopTestModule],
        declarations: [ModoPagoMySuffixComponent],
        providers: []
      })
        .overrideTemplate(ModoPagoMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ModoPagoMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ModoPagoMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ModoPagoMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.modoPagos && comp.modoPagos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
