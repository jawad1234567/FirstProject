import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // Import CommonModule and FormsModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials = {
    email: '',
    password: '',
  };
  errorMessage = '';

  // Login function
  login() {
    // Fetch users from Local Storage
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if the user exists and the password is correct
    const user = users.find(
      (u: any) =>
        u.email === this.credentials.email &&
        u.password === this.credentials.password
    );

    if (user) {
      localStorage.setItem('isLoggedIn', 'true'); 
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'Welcome back!',
      });
      this.router.navigate(['/application']); 
      // Here you can redirect the user to the dashboard or another page
    } else {
      this.errorMessage = 'Invalid email or password.';
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: this.errorMessage,
      });
    }
  }

  constructor(private router: Router) {}

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}

