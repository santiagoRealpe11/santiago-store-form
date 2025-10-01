import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsInfo } from './products-info';

describe('ProductsInfo', () => {
  let component: ProductsInfo;
  let fixture: ComponentFixture<ProductsInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
