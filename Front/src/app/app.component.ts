import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth/auth.service';
import { CartService } from './services/cart.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,NgClass,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  isDropdownOpen = false;
  cartItemCount: number = 0;

  username: string | null = null;
  constructor(private authService: AuthService,private router: Router , private cartService : CartService) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.isLoggedIn = !!user;
      this.username = user ? user.username : null;
      console.log('Navbar currentUser:', user);
    });
    this.cartService.cartItemCount$.subscribe(count => {
      this.cartItemCount = count;
    });
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  logout() {
    this.authService.logout();
    this.isDropdownOpen = false;
    this.router.navigate(['/login']);
  }
}