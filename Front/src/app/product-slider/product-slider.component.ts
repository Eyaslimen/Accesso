import { Component, AfterViewInit, OnInit, Output, EventEmitter } from '@angular/core';
import { NgFor } from '@angular/common';
import { AuthService } from '../services/auth/auth.service';
import { CartService } from '../services/cart.service';
import { Product, ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-slider',
  standalone: true,
  imports: [NgFor],
  templateUrl: './product-slider.component.html',
  styleUrl: './product-slider.component.css'
})
export class ProductSliderComponent implements AfterViewInit,OnInit {

    @Output() categorySelected = new EventEmitter<number>();
    products: Product[] = [];
    currentUser : any;
    constructor(private productsService: ProductsService, private authService: AuthService,private cartService:CartService) {
      this.authService.currentUser.subscribe(user => {
        this.currentUser = user;
      }); }
   ngOnInit(): void {
         this.loadProducts(12);
       }
     
      loadProducts(categoryId: number): void {
         this.productsService.getProductsByCategory(categoryId).subscribe((products: Product[]) => {
          this.products = products;
        });
       }
  
  ngAfterViewInit() {
    const next = document.querySelector('#next') as HTMLButtonElement;
    const prev = document.querySelector('#prev') as HTMLButtonElement;

    function handleScrollNext() {
      const cards = document.querySelector('.card-content') as HTMLElement;
      cards.scrollLeft += window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100;
    }

    function handleScrollPrev() {
      const cards = document.querySelector('.card-content') as HTMLElement;
      cards.scrollLeft -= window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100;
    }

    next.addEventListener('click', handleScrollNext);
    prev.addEventListener('click', handleScrollPrev);
  }

  onAddToCart(productId: number): void {
    if (this.currentUser) {
      const userId = this.currentUser.id;
      const name=this.currentUser.id;
      console.log(userId); 
      console.log(name);
      this.cartService.addToCart(userId, productId,1).subscribe({
        next: response => {
          console.log('Product added to cart', response);
        },
        error: error => {
          console.error('Error adding product to cart', error);
        }
      });
    } else {
      console.log('User not logged in');
    }
  }
}