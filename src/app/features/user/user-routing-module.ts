import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAccountComponent } from './user-account/user-account.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { UserWishlistComponent } from './user-wishlist/user-wishlist.component';

const routes : Routes = [
    {path: 'account', component: UserAccountComponent},
    {path: 'orders', component : UserOrdersComponent},
    {path: 'wishlist', component: UserWishlistComponent}

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }