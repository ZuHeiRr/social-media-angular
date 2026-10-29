import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedCenterContentComponent } from './feed-center-content.component';

describe('FeedCenterContentComponent', () => {
  let component: FeedCenterContentComponent;
  let fixture: ComponentFixture<FeedCenterContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedCenterContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeedCenterContentComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
