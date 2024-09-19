import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ca est necessaire pour utiliser NgModule
@Component({
  selector: 'app-registerr',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './registerr.component.html',
  styleUrl: './registerr.component.css'
})
export class RegisterrComponent {
  user = {
    username: '',
    email: '',
    password: ''
  };

  constructor(private authService: AuthService) { }

}