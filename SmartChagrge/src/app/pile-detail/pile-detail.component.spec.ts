import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PileDetailComponent } from './pile-detail.component';

describe('PileDetailComponent', () => {
  let component: PileDetailComponent;
  let fixture: ComponentFixture<PileDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PileDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PileDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
