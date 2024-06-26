import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './all-products/all-products.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserWishlistComponent } from './user-wishlist/user-wishlist.component';
import { UserCartComponent } from './user-cart/user-cart.component';

const routes: Routes = [

  {path:'',component:AllProductsComponent},
  {path:'view/product/:id',component:ViewProductsComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'wishlist',component:UserWishlistComponent},
  {path:'cart',component:UserCartComponent},
  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
