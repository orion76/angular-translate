import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransTranslatedComponent } from './trans-translated.component';

describe('TransTranslatedComponent', () => {
  let component: TransTranslatedComponent;
  let fixture: ComponentFixture<TransTranslatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransTranslatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransTranslatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
