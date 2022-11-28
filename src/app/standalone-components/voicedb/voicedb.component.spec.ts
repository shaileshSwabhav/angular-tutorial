import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoicedbComponent } from './voicedb.component';

describe('VoicedbComponent', () => {
  let component: VoicedbComponent;
  let fixture: ComponentFixture<VoicedbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ VoicedbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoicedbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
