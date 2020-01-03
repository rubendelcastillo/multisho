/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { MultishopTestModule } from '../../../test.module';
import { PedidoMySuffixUpdateComponent } from 'app/entities/pedido-my-suffix/pedido-my-suffix-update.component';
import { PedidoMySuffixService } from 'app/entities/pedido-my-suffix/pedido-my-suffix.service';
import { PedidoMySuffix } from 'app/shared/model/pedido-my-suffix.model';

describe('Component Tests', () => {
  describe('PedidoMySuffix Management Update Component', () => {
    let comp: PedidoMySuffixUpdateComponent;
    let fixture: ComponentFixture<PedidoMySuffixUpdateComponent>;
    let service: PedidoMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MultishopTestModule],
        declarations: [PedidoMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PedidoMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PedidoMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PedidoMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PedidoMySuffix(123);
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
        const entity = new PedidoMySuffix();
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
