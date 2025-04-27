import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, CategoryCreateInput, CategoryUpdateInput } from '../data/category';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoriesUrl = `${environment.apiUrl}v1/categories`;

  constructor(private http: HttpClient) { }

  
  getAll(name?: string): Observable<Category[]> {
    let params = new HttpParams();
    if (name) {
      params = params.set('name', name);
    }
    return this.http.get<Category[]>(this.categoriesUrl, { params });
  }

  
  getById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.categoriesUrl}/${id}`);
  }

 
  create(category: CategoryCreateInput): Observable<Category> {
    return this.http.post<Category>(this.categoriesUrl, category);
  }

  
  update(id: string, category: CategoryUpdateInput): Observable<Category> {
    return this.http.put<Category>(`${this.categoriesUrl}/${id}`, category);
  }

  
  deleteById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.categoriesUrl}/${id}`);
  }

  
  existsByName(name: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.categoriesUrl}/exists?name=${encodeURIComponent(name)}`);
  }
}