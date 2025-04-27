import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Post } from '../data/post';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) { }

  private postsUrl = `${environment.apiUrl}v1/posts`;


  getPosts(searchValue?: string): Observable<Post[]> {
    if (searchValue) {
      const params = new HttpParams().set('value', searchValue);
      return this.http.get<Post[]>(this.postsUrl, { params });
    }
    return this.http.get<Post[]>(this.postsUrl);
  }


  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.postsUrl}/${id}`);
  }


  getPostsByCategory(categoryId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.postsUrl}/category/${categoryId}`);
  }


  createPost(title: string, content: string, categoryId?: string): Observable<Post> {
    const postData = {
      title,
      content,
      categoryId
    };
    return this.http.post<Post>(this.postsUrl, postData);
  }


  updatePost(id: string, title: string, content: string): Observable<Post> {
    const postData = {
      title,
      content
    };
    return this.http.put<Post>(`${this.postsUrl}/${id}`, postData);
  }


  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${this.postsUrl}/${id}`);
  }
}