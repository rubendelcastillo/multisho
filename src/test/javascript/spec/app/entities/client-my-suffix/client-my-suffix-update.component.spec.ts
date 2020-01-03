/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { MultishopTestModule } from '../../../test.module';
import { ClientMySuffixUpdateComponent } from 'app/entities/client-my-suffix/client-my-suffix-update.component';
import { ClientMySuffixService } from 'app/entities/client-my-suffix/client-my-suffix.service';
import { ClientMySuffix } from 'app/shared/model/client-my-suffix.model';

describe('Component Tests', () => {
  describe('ClientMySuffix Management Update Component', () => {
    let comp: ClientMySuffixUpdateComponent;
    let fixture: ComponentFixture<ClientMySuffixUpdateComponent>;
    let service: ClientMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MultishopTestModule],
        declarations: [ClientMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ClientMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ClientMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ClientMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ClientMySuffix(123);
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
        const entity = new ClientMySuffix();
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
