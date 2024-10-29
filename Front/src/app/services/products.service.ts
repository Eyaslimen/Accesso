import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl = 'http://localhost:5278/api'; // URL de votre API

  constructor(private http: HttpClient) { }
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }
  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/categories/${categoryId}/products`);
  }
  getFilteredProducts(categoryId: number, minPrice?: number, maxPrice?: number): Observable<Product[]> {
    let params: any = {};
    if (minPrice !== undefined) {
      params.minPrice = minPrice;
    }
    if (maxPrice !== undefined) {
      params.maxPrice = maxPrice;
    }
    return this.http.get<Product[]>(`${this.baseUrl}/categories/${categoryId}/products`, { params });
  }  
  searchProducts(categoryId: number,query: string): Observable<Product[]> {
    let params: any = {};
    if (query !== undefined) {
      params.query = query;
    }
    return this.http.get<Product[]>(`${this.baseUrl}/categories/${categoryId}/products`, { params });
  }
  addToCart(userId: number, productId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Users/${userId}/cart/add`, productId);
  }

}
//pour definir notre data
export interface Category {
  id: number;
  name: string;
}
//pour definir notre data
export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}











