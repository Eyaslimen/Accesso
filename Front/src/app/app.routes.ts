import { Routes,Router } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { AuthComponent } from './auth/auth.component';
import { CartComponent } from './cart/cart.component';
import { ProductSliderComponent } from './product-slider/product-slider.component';
import { CategoryComponent } from './category/category.component';
import { CheckoutComponent } from './checkout/checkout.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
    },
    {
        path:'home',
        component:HomeComponent
    },
    {
        path:'login',
        component:AuthComponent
    },
    {
        path:'shop',
        component:ProductsComponent
    },
    {
        path:'contact',
        component:ContactComponent
        
    },
    {
        path:'about',
        component:AboutComponent
    },
    {
        path:'checkout',
        component:CheckoutComponent
    },
    {
        path:'cart',
        component:CartComponent
    },
    ];