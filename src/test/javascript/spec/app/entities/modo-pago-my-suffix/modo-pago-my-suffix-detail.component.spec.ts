import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MultishopTestModule } from '../../../test.module';
import { ModoPagoMySuffixDetailComponent } from 'app/entities/modo-pago-my-suffix/modo-pago-my-suffix-detail.component';
import { ModoPagoMySuffix } from 'app/shared/model/modo-pago-my-suffix.model';

describe('Component Tests', () => {
  describe('ModoPagoMySuffix Management Detail Component', () => {
    let comp: ModoPagoMySuffixDetailComponent;
    let fixture: ComponentFixture<ModoPagoMySuffixDetailComponent>;
    const route = ({ data: of({ modoPago: new ModoPagoMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MultishopTestModule],
        declarations: [ModoPagoMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ModoPagoMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ModoPagoMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load modoPago on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.modoPago).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
