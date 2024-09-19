import { Component, AfterViewInit, OnInit, Output, EventEmitter } from '@angular/core';
import { Product, ProductsService } from '../products.service';
import { NgFor } from '@angular/common';

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
    constructor(private productsService: ProductsService) {
   }   
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
}