import { Component } from '@angular/core';
import { WhyUsComponent } from "../why-us/why-us.component";
import { NewArrivalsComponent } from "../new-arrivals/new-arrivals.component";
import { ProductsComponent } from "../products/products.component";
import { SubscribeComponent } from "../subscribe/subscribe.component";
import { FooterComponent } from "../footer/footer.component";
import { FirstpageComponent } from "../firstpage/firstpage.component";
import { TestimonialsComponent } from "../testimonials/testimonials.component";
import { CategoryComponent } from "../category/category.component";
import { ProductSliderComponent } from "../product-slider/product-slider.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WhyUsComponent, NewArrivalsComponent, ProductsComponent, SubscribeComponent, FooterComponent, FirstpageComponent, TestimonialsComponent, CategoryComponent, ProductSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
