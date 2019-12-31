import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MultishopTestModule } from '../../../test.module';
import { ModoPagoMySuffixUpdateComponent } from 'app/entities/modo-pago-my-suffix/modo-pago-my-suffix-update.component';
import { ModoPagoMySuffixService } from 'app/entities/modo-pago-my-suffix/modo-pago-my-suffix.service';
import { ModoPagoMySuffix } from 'app/shared/model/modo-pago-my-suffix.model';

describe('Component Tests', () => {
  describe('ModoPagoMySuffix Management Update Component', () => {
    let comp: ModoPagoMySuffixUpdateComponent;
    let fixture: ComponentFixture<ModoPagoMySuffixUpdateComponent>;
    let service: ModoPagoMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MultishopTestModule],
        declarations: [ModoPagoMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ModoPagoMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ModoPagoMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ModoPagoMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ModoPagoMySuffix(123);
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
        const entity = new ModoPagoMySuffix();
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
