import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TransOriginalComponent } from './trans-original.component';



describe('TransOriginalComponent', () => {
  let component: TransOriginalComponent;
  let fixture: ComponentFixture<TransOriginalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransOriginalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransOriginalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
