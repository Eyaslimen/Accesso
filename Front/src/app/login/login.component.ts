import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService) { }

  onSubmit2() {
    this.authService.login(this.user).subscribe({
      next: response => {
        console.log('Login successful', response);
        sessionStorage.setItem('username', this.user.username);
      },
      error: error => {
        console.error('Error logging in', error);
      }
    });
  }
}