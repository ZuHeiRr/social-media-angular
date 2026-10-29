import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly httpClient = inject(HttpClient);
  myHeaders: object = {
    headers: {
      AUTHORIZATION: `Bearer ${localStorage.getItem('socialToken')}`,
    },
  };
  getMyProfile(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/users/profile-data`, this.myHeaders);
  }
  getUserPosts(userId: any): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/users/${userId}/posts`, this.myHeaders);
  }
  getUserProfile(userId: any): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/users/${userId}/profile`, this.myHeaders);
  }
  getSavedPosts(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/users/bookmarks`, this.myHeaders);
  }
  changeProfilePhoto(data: object): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/users/upload-photo`, data, this.myHeaders);
  }
}
