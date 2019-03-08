import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransSourceComponent } from './trans-source.component';

describe('TransSourceComponent', () => {
  let component: TransSourceComponent;
  let fixture: ComponentFixture<TransSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransSourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
