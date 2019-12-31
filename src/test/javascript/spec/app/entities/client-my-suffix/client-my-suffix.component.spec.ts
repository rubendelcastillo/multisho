import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MultishopTestModule } from '../../../test.module';
import { ClientMySuffixComponent } from 'app/entities/client-my-suffix/client-my-suffix.component';
import { ClientMySuffixService } from 'app/entities/client-my-suffix/client-my-suffix.service';
import { ClientMySuffix } from 'app/shared/model/client-my-suffix.model';

describe('Component Tests', () => {
  describe('ClientMySuffix Management Component', () => {
    let comp: ClientMySuffixComponent;
    let fixture: ComponentFixture<ClientMySuffixComponent>;
    let service: ClientMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MultishopTestModule],
        declarations: [ClientMySuffixComponent],
        providers: []
      })
        .overrideTemplate(ClientMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ClientMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ClientMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ClientMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.clients && comp.clients[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
