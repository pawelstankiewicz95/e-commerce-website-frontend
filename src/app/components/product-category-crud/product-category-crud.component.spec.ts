import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryCrudComponent } from './product-category-crud.component';

describe('ProductCategoryCrudComponent', () => {
  let component: ProductCategoryCrudComponent;
  let fixture: ComponentFixture<ProductCategoryCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCategoryCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCategoryCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
