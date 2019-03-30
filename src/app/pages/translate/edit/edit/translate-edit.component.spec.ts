import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransEditComponent } from './translate-edit.component';

describe('TransEditComponent', () => {
  let component: TransEditComponent;
  let fixture: ComponentFixture<TransEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
