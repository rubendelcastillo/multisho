import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MultishopTestModule } from '../../../test.module';
import { EstadoPedidoMySuffixUpdateComponent } from 'app/entities/estado-pedido-my-suffix/estado-pedido-my-suffix-update.component';
import { EstadoPedidoMySuffixService } from 'app/entities/estado-pedido-my-suffix/estado-pedido-my-suffix.service';
import { EstadoPedidoMySuffix } from 'app/shared/model/estado-pedido-my-suffix.model';

describe('Component Tests', () => {
  describe('EstadoPedidoMySuffix Management Update Component', () => {
    let comp: EstadoPedidoMySuffixUpdateComponent;
    let fixture: ComponentFixture<EstadoPedidoMySuffixUpdateComponent>;
    let service: EstadoPedidoMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MultishopTestModule],
        declarations: [EstadoPedidoMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EstadoPedidoMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstadoPedidoMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EstadoPedidoMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EstadoPedidoMySuffix(123);
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
        const entity = new EstadoPedidoMySuffix();
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
