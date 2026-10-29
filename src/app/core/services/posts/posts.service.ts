import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly httpClient = inject(HttpClient);
  myHeaders: object = {
    headers: {
      AUTHORIZATION: `Bearer ${localStorage.getItem('socialToken')}`,
    },
  };

  getAllPosts(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/posts`, this.myHeaders);
  }
  createPost(body: any): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/posts`, body, this.myHeaders);
  }
  getSinglePost(postId: any): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/posts/${postId}`, this.myHeaders);
  }
  deletePost(postId: any): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/posts/${postId}`, this.myHeaders);
  }

  updatePost(postId: any, body: any): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/posts/${postId}`, body, this.myHeaders);
  }
  savePost(postId: any): Observable<any> {
    return this.httpClient.put(
      `${environment.baseUrl}/posts/${postId}/bookmark`,
      {},
      this.myHeaders,
    );
  }
  likePost(postId: any): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/posts/${postId}/like`, {}, this.myHeaders);
  }
  getFollowSuggestion(): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}/users/suggestions?limit=20&skip=40`,

      this.myHeaders,
    );
  }
  followUser(userId: any): Observable<any> {
    return this.httpClient.put(
      `${environment.baseUrl}/users/${userId}/follow`,
      {},

      this.myHeaders,
    );
  }
}
