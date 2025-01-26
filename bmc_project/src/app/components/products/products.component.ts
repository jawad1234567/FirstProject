import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2'; 
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule], // Import CommonModule and FormsModule
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products = [
    {
      id: 1,
      name: 'Lorem Ipsum Product 1',
      price: 92.0,
      image: 'assets/54176844.jpg',
      inCart: false,
    },
    {
      id: 2,
      name: 'Lorem Ipsum Product 2',
      price: 100.0,
      image: 'assets/87246664.jpg',
      inCart: false,
    },
    {
      id: 3,
      name: 'Lorem Ipsum Product 3',
      price: 189.0,
      image: 'assets/images.jpeg',
      inCart: false,
    },
    {
      id: 4,
      name: 'Lorem Ipsum Product 1',
      price: 200.0,
      image: 'assets/images (1).jpeg',
      inCart: false,
    },
    {
      id: 5,
      name: 'Lorem Ipsum Product 1',
      price: 50.0,
      image: 'assets/thomas-1-min-2.jpg',
      inCart: false,
    },
    {
      id: 6,
      name: 'Lorem Ipsum Product 1',
      price: 60.0,
      image: 'assets/Untitled1_0003_TOM_5996.jpg-min.jpg',
      inCart: false,
    },
    {
      id: 7,
      name: 'Lorem Ipsum Product 1',
      price: 225.0,
      image: 'assets/watch.jpeg',
      inCart: false,
    },
    {
      id: 8,
      name: 'Lorem Ipsum Product 1',
      price: 40.0,
      image: 'assets/watch1.jpeg',
      inCart: false,
    },
    {
      id: 9,
      name: 'Lorem Ipsum Product 1',
      price: 75.0,
      image: 'assets/61yVvmqvbNL.jpg',
      inCart: false,
    },
    {
      id: 10,
      name: 'Lorem Ipsum Product 1',
      price: 249.0,
      image: 'assets/1.jpg',
      inCart: false,
    }
  ];

  constructor(private cartService: CartService) {}

  ngOnInit() {
   
    this.products.forEach(product => {
      product.inCart = this.cartService.getCartItems().some(item => item.id === product.id);
    });
  }
  
  addToCart(product: any) {
    this.cartService.addToCart(product);
    product.inCart = true; // מעדכן שהמוצר בעגלה
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: `${product.name} added to cart!`,
      showConfirmButton: false,
      timer: 1000,
    });
  }

  removeFromCart(product: any) {
    this.cartService.removeFromCart(product);
    product.inCart = false; // מסיר את המוצר מהעגלה
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'info',
      title: `${product.name} removed from cart!`,
      showConfirmButton: false,
      timer: 1000,
    });
  }
  
}
