import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Category, Product } from '../products.service';
import { ProductsService } from '../products.service';
import { CommonModule, NgFor } from '@angular/common';
import { AuthService } from '../services/auth/auth.service';
import { CartService } from '../services/cart.service';
import { FormsModule } from '@angular/forms'; //pour ngModel
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink,RouterOutlet,NgFor,CommonModule,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
   @Output() categorySelected = new EventEmitter<number>();
   products: Product[] = [];
   categories: Category[] = [];
   currentUser: any;
   minPrice: number | undefined;
   maxPrice: number | undefined;
   query!: string ;
   showFilterForm: boolean = false;
   showSearch: boolean = false;
   selectedCategoryId!: number;
   constructor(private productsService: ProductsService, private authService: AuthService,private cartService:CartService) {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }   
  ngOnInit(): void {
        this.loadCategories();
      }
      toggleFilterForm(): void {
        this.showSearch=false;
        this.showFilterForm = !this.showFilterForm;
        this.loadProducts(this.selectedCategoryId);
      }
      toggleSearchForm(): void {
        this.showFilterForm = false;
        this.showSearch = !this.showSearch;
        this.loadProducts(this.selectedCategoryId);

      }
    
      onFilterClick(): void {
        if (this.selectedCategoryId !== null) {
          this.productsService.getFilteredProducts(this.selectedCategoryId, this.minPrice, this.maxPrice).subscribe(products => {
            this.products = products;
            this.showFilterForm = false; // Masquer le formulaire après le filtrage
          });
        }
      }
      onSearchClick() : void {
        if (this.selectedCategoryId !== null) {
          this.productsService.searchProducts(this.selectedCategoryId, this.query).subscribe(products => {
            this.products = products;
            this.showSearch = false; // Masquer le formulaire après le filtrage
          });
        }
      }
       loadCategories(): void {
        this.productsService.getCategories().subscribe(categories => {
         this.categories = categories;
         categories.pop(); 
         if (categories.length > 0) {
         this.selectedCategoryId = categories[3].id;
           this.loadProducts(this.selectedCategoryId); // pour afficher les produits du premiere categories
         }
      });
     }
     loadProducts(categoryId: number): void {
        this.productsService.getProductsByCategory(categoryId).subscribe(products => {
         this.products = products;
       });
      }
    
     onCategoryClick(categoryId: number): void {
      this.selectedCategoryId = categoryId;
     this.loadProducts(categoryId);
       this.categorySelected.emit(categoryId);
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
