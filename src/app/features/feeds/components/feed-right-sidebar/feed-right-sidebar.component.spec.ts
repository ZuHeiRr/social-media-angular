import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedRightSidebarComponent } from './feed-right-sidebar.component';

describe('FeedRightSidebarComponent', () => {
  let component: FeedRightSidebarComponent;
  let fixture: ComponentFixture<FeedRightSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedRightSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeedRightSidebarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
