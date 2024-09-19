import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,NgClass,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isLoggedIn = false;
  isDropdownOpen = false;
  username: string | null = null;
  constructor(private authService: AuthService,private router: Router) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.isLoggedIn = !!user;
      this.username = user ? user.username : null;
      console.log('Navbar currentUser:', user);
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