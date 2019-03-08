import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransResultComponent } from './trans-result.component';

describe('TransResultComponent', () => {
  let component: TransResultComponent;
  let fixture: ComponentFixture<TransResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
