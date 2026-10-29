import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { PostsService } from '../../../../core/services/posts/posts.service';
import { IFollowSuggestions } from '../../../../core/models/iposts.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-feed-right-sidebar',
  imports: [RouterLink],
  templateUrl: './feed-right-sidebar.component.html',
  styleUrl: './feed-right-sidebar.component.css',
})
export class FeedRightSidebarComponent implements OnInit {
  private readonly postsService = inject(PostsService);
  isLoading = signal(true);

  followSuggestions: WritableSignal<IFollowSuggestions[]> = signal([]);

  ngOnInit(): void {
    this.getFollowSuggestion();
  }

  getFollowSuggestion() {
    this.postsService.getFollowSuggestion().subscribe({
      next: (res) => {
        this.followSuggestions.set(res.data.suggestions);
        console.log('suggestion: ', this.followSuggestions());
        this.isLoading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.isLoading.set(false);
      },
    });
  }
  followUser(id: string) {
    this.postsService.followUser(id).subscribe({
      next: (res) => {
        console.log('follow: ', res);
        this.followSuggestions.update((users) =>
          users.map((user) =>
            user._id === id ? { ...user, followersCount: res.data.followersCount } : user,
          ),
        );
        this.getFollowSuggestion();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
