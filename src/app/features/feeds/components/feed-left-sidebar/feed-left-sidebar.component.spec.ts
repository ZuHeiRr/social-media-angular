import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedLeftSidebarComponent } from './feed-left-sidebar.component';

describe('FeedLeftSidebarComponent', () => {
  let component: FeedLeftSidebarComponent;
  let fixture: ComponentFixture<FeedLeftSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedLeftSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeedLeftSidebarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
