import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MultishopTestModule } from '../../../test.module';
import { DetallePedidoMySuffixUpdateComponent } from 'app/entities/detalle-pedido-my-suffix/detalle-pedido-my-suffix-update.component';
import { DetallePedidoMySuffixService } from 'app/entities/detalle-pedido-my-suffix/detalle-pedido-my-suffix.service';
import { DetallePedidoMySuffix } from 'app/shared/model/detalle-pedido-my-suffix.model';

describe('Component Tests', () => {
  describe('DetallePedidoMySuffix Management Update Component', () => {
    let comp: DetallePedidoMySuffixUpdateComponent;
    let fixture: ComponentFixture<DetallePedidoMySuffixUpdateComponent>;
    let service: DetallePedidoMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MultishopTestModule],
        declarations: [DetallePedidoMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DetallePedidoMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DetallePedidoMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DetallePedidoMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DetallePedidoMySuffix(123);
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
        const entity = new DetallePedidoMySuffix();
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
