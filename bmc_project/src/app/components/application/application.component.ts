import { Component } from '@angular/core';
import { Router } from '@angular/router'; // 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})

export class ApplicationComponent {
  constructor(private router: Router) {}

  goToProducts() {
    this.router.navigate(['products'], { relativeTo: this.router.routerState.root.firstChild });
  }

  goToCart() {
    this.router.navigate(['cart'], { relativeTo: this.router.routerState.root.firstChild });
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }
}
