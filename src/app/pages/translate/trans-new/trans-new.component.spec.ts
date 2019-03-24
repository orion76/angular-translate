import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransNewComponent } from './trans-new.component';

describe('TransNewComponent', () => {
  let component: TransNewComponent;
  let fixture: ComponentFixture<TransNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
