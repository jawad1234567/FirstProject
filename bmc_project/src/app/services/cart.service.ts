import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = []; // אחסון המוצרים בעגלה

  // הוספת מוצר לעגלה
  addToCart(product: any) {
    this.cartItems.push(product);
  }

  // הסרת מוצר מהעגלה
  removeFromCart(product: any) {
    this.cartItems = this.cartItems.filter(item => item.id !== product.id);
  }

  // קבלת כל המוצרים בעגלה
  getCartItems() {
    return this.cartItems;
  }

  // ניקוי העגלה
  clearCart() {
    this.cartItems = [];
  }
}
