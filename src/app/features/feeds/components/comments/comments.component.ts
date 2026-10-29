import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IComment } from '../../../../core/models/icomment.interface';
import { CommentsService } from './../../../../core/services/comments/comments.service';
import {
  Component,
  HostListener,
  inject,
  input,
  InputSignal,
  signal,
  WritableSignal,
} from '@angular/core';

@Component({
  selector: 'app-comments',
  imports: [ReactiveFormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent {
  private readonly commentsService = inject(CommentsService);
  loggedUserId = JSON.parse(localStorage.getItem('user')!)._id;
  postComments: WritableSignal<IComment[]> = signal([]);
  postId: InputSignal<string> = input('');
  commentIdToUpdate: WritableSignal<string | null> = signal(null);
  isCommentMenuOpen = signal(false);
  commentMenuId = signal<string | null>(null);
  commentEditedContent = new FormControl(' ');

  ngOnInit(): void {
    this.getPostComment();
  }

  commentContent = new FormControl(' ');
  getPostComment() {
    this.commentsService.getPostComments(this.postId()).subscribe({
      next: (res) => {
        console.log(res.data.comments);
        this.postComments.set(res.data.comments);
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }

  createComment() {
    let formData = new FormData();
    if (this.commentContent.value) {
      formData.append('content', this.commentContent.value.trim());
    }
    this.commentsService.createPostComment(this.postId(), formData).subscribe({
      next: (res) => {
        console.log(res);
        this.commentContent.setValue(' ');
        this.getPostComment();
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }
  toggleCommentMenu(event: MouseEvent, commentId: string) {
    event.stopPropagation();
    this.isCommentMenuOpen.update((value) => !value);
    this.commentMenuId.set(commentId);
  }

  @HostListener('document:click')
  closeCommentMenu() {
    this.isCommentMenuOpen.set(false);
  }

  deleteComment(commentId: string) {
    this.commentsService.deletePostComment(this.postId(), commentId).subscribe({
      next: (res) => {
        console.log(res);
        this.getPostComment();
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }
  editComment(comment: IComment) {
    this.commentIdToUpdate.set(comment._id);
    this.commentEditedContent.setValue(comment.content);
  }
  saveEditedComment(commentId: string) {
    let formData = new FormData();
    if (this.commentEditedContent.value) {
      formData.append('content', this.commentEditedContent.value.trim());
    }
    this.commentsService.editPostComment(this.postId(), commentId, formData).subscribe({
      next: (res) => {
        console.log(res);
        this.commentIdToUpdate.set(null);
        this.getPostComment();
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }
}
