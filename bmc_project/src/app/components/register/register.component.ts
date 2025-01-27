import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule], // Import CommonModule and FormsModule
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user = {
    email: '',
    password: '',
  };
  confirmPassword = '';
  errorMessage = '';

  // Register function
  register() {
    // Fetch existing users from local storage
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if the email already exists
    const userExists = users.some((u: any) => u.email === this.user.email);
    if (userExists) {
      this.errorMessage = 'A user with this email already exists!';
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: this.errorMessage,
      });
      return;
    }

    if (this.user.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: this.errorMessage,
      });
      return;
    }
    

    // Add the new user to local storage
    users.push({ ...this.user });
    localStorage.setItem('users', JSON.stringify(users));

    // Success alert
    Swal.fire({
      icon: 'success',
      title: 'Registration Successful',
      text: 'Your account has been created successfully!',
    });
    this.router.navigate(['/login']);
    
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
   constructor(private router: Router) {}
  
}
