import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
}) 
export class CartService {
  private apiUrll='http://localhost:5278/api';

  private cartItemCount = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCount.asObservable(); // Observable for components to subscribe to

  constructor(private http : HttpClient) { }

    // Method to initialize the cart item count when the user loads the cart
    initializeCartItemCount(userId: number) {
      this.getCartItems(userId).subscribe(cartItems => {
        const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        this.cartItemCount.next(totalQuantity);
      });
    } 
  getCartItems(userId:number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrll}/Carts/cart/${userId}`);
  }
  addToCart(userId: number, productId: number, quantity: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrll}/Carts/cart/${userId}/add`, { ProductId: productId, Quantity: quantity })
      .pipe(
        tap(() => {
          // Increment the cart item count when a new item is added
          const currentCount = this.cartItemCount.value;
          this.cartItemCount.next(currentCount + quantity);
        })
      );
  }

  deleteCartItem(userId: number, itemId: number): Observable<void> {
    return this.getCartItems(userId).pipe(
      // Trouver l'élément à supprimer pour obtenir sa quantité
      tap(cartItems => {
        const itemToRemove = cartItems.find(item => item.id === itemId);
        if (itemToRemove) {
          // Décrémenter la quantité totale
          const currentCount = this.cartItemCount.value;
          this.cartItemCount.next(currentCount - itemToRemove.quantity);
        }
      }),
      // Supprimer l'élément
      switchMap(() => this.http.delete<void>(`${this.apiUrll}/Carts/cart/${userId}/remove/${itemId}`))
    );
  }
  DeleteAll(userId: number) {
    
  }

  clearCartItemCount() {
    this.cartItemCount.next(0); // Reset count when the cart is cleared
  }
}
export interface CartItem {
  id: number;
  productName: string;
  price:number;
  quantity: number;
  imageUrl:string;
}