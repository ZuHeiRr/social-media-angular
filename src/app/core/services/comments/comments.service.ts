import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private readonly httpClient = inject(HttpClient);
  myHeaders: object = {
    headers: {
      AUTHORIZATION: `Bearer ${localStorage.getItem('socialToken')}`,
    },
  };

  getPostComments(postId: any): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/posts/${postId}/comments`, this.myHeaders);
  }
  createPostComment(postId: any, commentData: any): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/posts/${postId}/comments`,
      commentData,
      this.myHeaders,
    );
  }
  deletePostComment(postId: any, commentId: any): Observable<any> {
    return this.httpClient.delete(
      `${environment.baseUrl}/posts/${postId}/comments/${commentId}`,
      this.myHeaders,
    );
  }
  editPostComment(postId: any, commentId: any, commentData: any): Observable<any> {
    return this.httpClient.put(
      `${environment.baseUrl}/posts/${postId}/comments/${commentId}`,
      commentData,
      this.myHeaders,
    );
  }
}
