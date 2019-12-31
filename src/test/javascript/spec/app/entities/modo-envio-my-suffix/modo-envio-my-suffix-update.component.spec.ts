import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MultishopTestModule } from '../../../test.module';
import { ModoEnvioMySuffixUpdateComponent } from 'app/entities/modo-envio-my-suffix/modo-envio-my-suffix-update.component';
import { ModoEnvioMySuffixService } from 'app/entities/modo-envio-my-suffix/modo-envio-my-suffix.service';
import { ModoEnvioMySuffix } from 'app/shared/model/modo-envio-my-suffix.model';

describe('Component Tests', () => {
  describe('ModoEnvioMySuffix Management Update Component', () => {
    let comp: ModoEnvioMySuffixUpdateComponent;
    let fixture: ComponentFixture<ModoEnvioMySuffixUpdateComponent>;
    let service: ModoEnvioMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MultishopTestModule],
        declarations: [ModoEnvioMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ModoEnvioMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ModoEnvioMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ModoEnvioMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ModoEnvioMySuffix(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ModoEnvioMySuffix();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
