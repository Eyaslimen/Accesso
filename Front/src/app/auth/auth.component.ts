import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  user = {
    username: '',
    email: '',
    password: ''
  };
  userLogin = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    document.querySelector('.img__btn')!.addEventListener('click', function () {
      document.querySelector('.cont')!.classList.toggle('s--signup');
    });
  }

  onSubmit() {
    this.authService.register(this.user).subscribe({
      next: response => {
        console.log('User registered successfully', response);
        alert('Utilisateur enregistré avec succès , Please SIGN IN NOW');
      },
      error: error => {
        alert('Error registering user');
        console.error('Error registering user', error);
      }
    });
  }

  onSubmit2() {
    console.log('Attempting login with:', this.userLogin); // Ajoutez ce journal pour vérifier les valeurs
    this.authService.login(this.userLogin).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.router.navigate(['/home']);
      },
      error: (error) => {
        alert('Error logging in');
        console.error('Error logging in', error);
        console.log(this.userLogin);
      }
    });
  }
}
