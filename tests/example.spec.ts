import { test, expect } from '@playwright/test';

test.describe('End-to-End Flow', () => {
  const baseURL = 'http://localhost:4200';

  test('User Registration and Login', async ({ page }) => {
    // שלב 1: הרשמה
    await page.goto(`${baseURL}/register`);
    await page.fill('input[name="email"]', 'testuser@example.com');
    await page.fill('input[name="password"]', 'Password123');
    await page.fill('input[name="confirmPassword"]', 'Password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(`${baseURL}/login`);
  
    if (await page.locator('.swal2-confirm').isVisible()) {
      await page.click('.swal2-confirm'); // לחיצה על כפתור ה-"OK" של ההודעה
    }
    
    // שלב 2: התחברות
    await page.fill('input[name="email"]', 'testuser@example.com');
    await page.fill('input[name="password"]', 'Password123');
    await page.waitForSelector('button[type="submit"]');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(`${baseURL}/application/products`);
    if (await page.locator('.swal2-confirm').isVisible()) {
      await page.click('.swal2-confirm'); // לחיצה על כפתור "OK"
    }
    await page.goto(`${baseURL}/application/products`);

    // הוסף מוצר לעגלה
    await page.click('button:has-text("Add")');

    // נווט לעגלה
    await page.click('button:has-text("🛍️ Cart")');
    await expect(page).toHaveURL(`${baseURL}/application/cart`);

    // בדוק שיש לפחות מוצר אחד בעגלה
    await expect(page.locator('.cart-item')).toHaveCount(1);

    // בדוק את שם המוצר
    const productName = await page.locator('.cart-item h3').textContent();
    expect(productName).toContain('Lorem Ipsum Product 1'); // החלף את השם בהתאם למוצר שלך

    // בדוק את המחיר
    const productPrice = await page.locator('.cart-item p').textContent();
    expect(productPrice).toContain('Price: €92');

    // לחץ על כפתור הסרת מוצר
    await page.click('button:has-text("Remove")');

    // בדוק שהעגלה ריקה
    const emptyCartMessage = await page.locator('p:has-text("Your cart is empty.")').isVisible();
    expect(emptyCartMessage).toBeTruthy();
  });
  


});

test.describe('3 Tests I added:', () => {
  const baseURL = 'http://localhost:4200';

  test('Navigate to application without Login', async ({ page }) => {
    await page.goto(`${baseURL}/application`);
    await expect(page).toHaveURL(`${baseURL}/login`);
  }); 

  test('Password too short shows an error', async ({ page }) => {
    await page.goto(`${baseURL}/register`);
  
    await page.fill('input[name="password"]', 'abc');
  
    await page.click('input[name="email"]');
  
    const errorMessage = await page.locator('.error-message:has-text("Password must be at least 6 characters long.")');
    await expect(errorMessage).toBeVisible();
  });
  

  test('Password missing uppercase letter shows an error', async ({ page }) => {
    await page.goto(`${baseURL}/register`);
  
    await page.fill('input[name="password"]', 'abcdef');
  
    await page.click('input[name="email"]');
  
    const errorMessage = await page.locator('.error-message:has-text("Password must contain at least one uppercase letter.")');
    await expect(errorMessage).toBeVisible();
  });
  

}); 
