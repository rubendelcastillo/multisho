import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MultishopTestModule } from '../../../test.module';
import { ProductMySuffixDetailComponent } from 'app/entities/product-my-suffix/product-my-suffix-detail.component';
import { ProductMySuffix } from 'app/shared/model/product-my-suffix.model';

describe('Component Tests', () => {
  describe('ProductMySuffix Management Detail Component', () => {
    let comp: ProductMySuffixDetailComponent;
    let fixture: ComponentFixture<ProductMySuffixDetailComponent>;
    const route = ({ data: of({ product: new ProductMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MultishopTestModule],
        declarations: [ProductMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ProductMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProductMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load product on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.product).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
