import { Component, OnInit } from '@angular/core';
import { CartItem, CartService } from '../services/cart.service';
import { AuthService } from '../services/auth/auth.service';
import { NgFor } from '@angular/common';
import {  RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, RouterLink, RouterOutlet, FooterComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'] // Correction de 'styleUrl' en 'styleUrls'
})
export class CartComponent implements OnInit {
  currentUser: any;
  total: number = 0;
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService, private authService: AuthService) {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.loadCartItems(user.id);
      }
    });
  }

  loadCartItems(UserId: number): void {
    this.cartService.getCartItems(UserId).subscribe(cartItems => {
      this.cartItems = cartItems;
      this.total = this.calculTotal(this.cartItems); // Calculer le total après avoir chargé les éléments
    });
  }

  calculTotal(cartItems: CartItem[]): number {
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      total += cartItems[i].price * cartItems[i].quantity;
    }
    return total;
  }

  placeOrder() {
    // Implementation for placing order
  }

  Delete(ItemId: number) {
    this.cartService.deleteCartItem(this.currentUser.id, ItemId).subscribe(
      () => {
        console.log("Article supprimé avec succès");
        // Mettre à jour l'état du panier ici, par exemple en retirant l'article supprimé de la liste
        this.cartItems = this.cartItems.filter(item => item.id !== ItemId);
        // Recalculer le total après la suppression
        this.total = this.calculTotal(this.cartItems);
      },
      (error) => {
        console.error("Erreur lors de la suppression de l'article", error);
      }
    );
  }
}
