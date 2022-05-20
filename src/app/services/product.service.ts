import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  storage!: Product[];

  constructor(private http: HttpClient) { }


  async loadProduct() {
    return await this.http.get<Product[]>('/api/products').toPromise();
  }

  async filterProducts(query: string) {
    return await this.http.get<Product[]>('/api/products', {
      params: {
        search: query
      }
    }
    ).toPromise();
  }

  async addproduct(product: Product) {
    return await this.http.post<Product>('/api/products', product).toPromise();
  }

  async get(id: number) {
    return await this.http.get<Product>('/api/products/' + id).toPromise();

  }
}
