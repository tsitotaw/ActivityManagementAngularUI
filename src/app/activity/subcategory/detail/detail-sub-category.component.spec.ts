import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSubCategoryComponent } from './detail-sub-category.component';

describe('DetailSubCategoryComponent', () => {
  let component: DetailSubCategoryComponent;
  let fixture: ComponentFixture<DetailSubCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailSubCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
