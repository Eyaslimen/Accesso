import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
}) 
export class CartService {
  private apiUrll='http://localhost:5278/api';
  constructor(private http : HttpClient) { }
  getCartItems(userId:number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrll}/Carts/cart/${userId}`);
  }
  addToCart(userId: number, productId: number, quantity: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrll}/Carts/cart/${userId}/add`, { ProductId: productId, Quantity: quantity });
  }
  deleteCartItem(userId: number, ItemId: number) {
    return this.http.delete<void>(`${this.apiUrll}/Carts/cart/${userId}/remove/${ItemId}`);
  }
}
export interface CartItem {
  id: number;
  productName: string;
  price:number;
  quantity: number;
  imageUrl:string;
}