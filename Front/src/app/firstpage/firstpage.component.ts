import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-firstpage',
  standalone: true,
  imports: [],
  templateUrl: './firstpage.component.html',
  styleUrl: './firstpage.component.css'
})
export class FirstpageComponent {
  constructor(private router:Router) {}
  shop(): void {
    this.router.navigate(['/shop']);  
  }
}
