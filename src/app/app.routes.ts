import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ApplicationComponent } from './components/application/application.component';
import { AuthGuard } from './guards/auth.guard';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';


export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'application',
    component: ApplicationComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: ProductsComponent },
      { path: 'cart', component: CartComponent },
    ],
  },
];
