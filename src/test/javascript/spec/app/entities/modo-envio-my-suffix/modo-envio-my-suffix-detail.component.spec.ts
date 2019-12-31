import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MultishopTestModule } from '../../../test.module';
import { ModoEnvioMySuffixDetailComponent } from 'app/entities/modo-envio-my-suffix/modo-envio-my-suffix-detail.component';
import { ModoEnvioMySuffix } from 'app/shared/model/modo-envio-my-suffix.model';

describe('Component Tests', () => {
  describe('ModoEnvioMySuffix Management Detail Component', () => {
    let comp: ModoEnvioMySuffixDetailComponent;
    let fixture: ComponentFixture<ModoEnvioMySuffixDetailComponent>;
    const route = ({ data: of({ modoEnvio: new ModoEnvioMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MultishopTestModule],
        declarations: [ModoEnvioMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ModoEnvioMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ModoEnvioMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load modoEnvio on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.modoEnvio).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
