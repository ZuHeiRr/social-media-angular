import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../core/services/posts/posts.service';
import { IPosts } from '../../core/models/iposts.interface';
import { CommentsComponent } from '../feeds/components/comments/comments.component';

@Component({
  selector: 'app-post-details',
  imports: [CommentsComponent],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css',
})
export class PostDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly postsService = inject(PostsService);

  private readonly router = inject(Router);

  goBack() {
    const returnUrl = history.state?.returnUrl;

    this.router.navigateByUrl(returnUrl?.startsWith('/') ? returnUrl : '/feed');
  }

  postID = signal('');
  postDetails: WritableSignal<IPosts> = signal({} as IPosts);
  ngOnInit(): void {
    this.readDataFromURL();
  }
  readDataFromURL() {
    this.activatedRoute.paramMap.subscribe((res) => {
      this.postID.set(res.get('id')!);
      console.log(this.postID());
      this.getSinglePost();
    });
  }
  getSinglePost() {
    this.postsService.getSinglePost(this.postID()).subscribe({
      next: (res: any) => {
        console.log(res);
        this.postDetails.set(res.data.post);
        console.log(this.postDetails());
      },
      error: (err: any) => {
        console.log(err.message);
      },
    });
  }
}
