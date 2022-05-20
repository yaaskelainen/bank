import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<Category[]>('/api/categories').toPromise();
  }

  create(cat: Category) {
    return this.http.post<Category>('/api/categories', cat).toPromise();
  }

  delete(id: number) {
    return this.http.delete<Category>('/api/categories/' + id).toPromise();
  }
}
