import { Component, signal } from '@angular/core';
import { FeedLeftSidebarComponent } from './components/feed-left-sidebar/feed-left-sidebar.component';
import { FeedCenterContentComponent } from './components/feed-center-content/feed-center-content.component';
import { FeedRightSidebarComponent } from './components/feed-right-sidebar/feed-right-sidebar.component';

@Component({
  selector: 'app-feeds',
  imports: [FeedLeftSidebarComponent, FeedCenterContentComponent, FeedRightSidebarComponent],
  templateUrl: './feeds.component.html',
  styleUrl: './feeds.component.css',
})
export class FeedsComponent {
  showMyPosts = signal(false);

  onMyPostsClicked() {
    this.showMyPosts.set(true);
  }
  showAllPosts() {
    this.showMyPosts.set(false);
  }
}
