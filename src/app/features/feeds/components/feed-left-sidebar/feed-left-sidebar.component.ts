import { Component, EventEmitter, Output, signal } from '@angular/core';

@Component({
  selector: 'app-feed-left-sidebar',
  imports: [],
  templateUrl: './feed-left-sidebar.component.html',
  styleUrl: './feed-left-sidebar.component.css',
})
export class FeedLeftSidebarComponent {
  activeTab = signal('feed');
  @Output() myPostsClicked = new EventEmitter<void>();
  @Output() allPostsClicked = new EventEmitter<void>();
}
