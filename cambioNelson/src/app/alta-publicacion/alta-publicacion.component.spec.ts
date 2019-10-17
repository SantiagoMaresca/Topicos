import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaPublicacionComponent } from './alta-publicacion.component';

describe('AltaPublicacionComponent', () => {
  let component: AltaPublicacionComponent;
  let fixture: ComponentFixture<AltaPublicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaPublicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaPublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
