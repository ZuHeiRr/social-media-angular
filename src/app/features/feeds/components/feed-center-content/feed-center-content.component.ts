import {
  Component,
  ElementRef,
  HostListener,
  inject,
  Input,
  OnInit,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { PostsService } from '../../../../core/services/posts/posts.service';
import { IPosts } from '../../../../core/models/iposts.interface';
import { CommentsComponent } from '../comments/comments.component';
import { CreatePostComponent } from './components/createPost/create-post/create-post.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../../../core/services/profile/profile.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-feed-center-content',
  imports: [CommentsComponent, CreatePostComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './feed-center-content.component.html',
  styleUrl: './feed-center-content.component.css',
})
export class FeedCenterContentComponent implements OnInit {
  private readonly postsService = inject(PostsService);
  private readonly profileService = inject(ProfileService);
  allPosts: WritableSignal<IPosts[]> = signal([]);
  selectedPostId = signal<string | null>(null);
  editedPostId = signal<string | null>(null);
  editedPostBody = new FormControl('');
  @Input() onlyMyPosts = false;
  postLiked = signal<Record<string, boolean>>({});
  likesCount = signal<Record<string, number>>({});

  loggenUser = JSON.parse(localStorage.getItem('user')!);
  loggenUserId = this.loggenUser._id;

  isLoading = signal(true);

  private router = inject(Router);

  openUserProfile(userId: string) {
    if (userId === this.loggenUserId) {
      this.router.navigate(['/profile']);
    } else {
      this.router.navigate(['/profile', userId]);
    }
  }
  ngOnInit(): void {
    this.getAllPosts();
  }
  getAllPosts() {
    this.postsService.getAllPosts().subscribe({
      next: (res) => {
        console.log(res.data.posts);
        this.allPosts.set(res.data.posts);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.log(err.message);
        this.isLoading.set(false);
      },
    });
  }

  changeCommentsDisplaying(postId: string) {
    this.selectedPostId.update((currentId) => (currentId === postId ? null : postId));
  }
  showPostOption = signal<string | null>(null);

  togglePostOption(postId: string) {
    this.showPostOption.update((currentId) => (currentId === postId ? null : postId));
  }

  @ViewChild('postOptionsMenu')
  postOptionsMenu!: ElementRef;
  @HostListener('document:click', ['$event'])
  closePostOption(event: MouseEvent) {
    if (this.showPostOption() && !this.postOptionsMenu.nativeElement.contains(event.target)) {
      this.showPostOption.set(null);
    }
  }

  deletePost(postId: string) {
    this.postsService.deletePost(postId).subscribe({
      next: (res) => {
        console.log(res);
        this.getAllPosts();
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }
  editPost(post: IPosts) {
    this.editedPostId.set(post._id);
    this.editedPostBody.setValue(post.body ?? '');
  }
  saveEditedPost(postId: string) {
    let formData = new FormData();
    if (this.editedPostBody.value) {
      formData.append('body', this.editedPostBody.value);
    }
    this.postsService.updatePost(postId, formData).subscribe({
      next: (res) => {
        console.log(res);
        this.getAllPosts();
        this.editedPostId.set(null);
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }

  get displayedPosts(): IPosts[] {
    if (!this.onlyMyPosts) {
      return this.allPosts();
    }

    return this.allPosts().filter((post) => post.user?._id === this.loggenUserId);
  }
  likePost(postId: string) {
    this.postsService.likePost(postId).subscribe({
      next: (res) => {
        this.postLiked.update((state) => ({
          ...state,
          [postId]: res.data.liked,
        }));

        this.likesCount.update((state) => ({
          ...state,
          [postId]: res.data.likesCount,
        }));
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }
  savePost(postId: string) {
    this.postsService.savePost(postId).subscribe({
      next: (res) => {
        this.allPosts.update((posts) =>
          posts.map((post) =>
            post._id === postId ? { ...post, bookmarked: res.data.bookmarked } : post,
          ),
        );
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }
}
