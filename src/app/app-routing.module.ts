/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IsLoginedGuard } from './is-logined.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./page/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./page/settings/settings.module').then( m => m.SettingsPageModule),
    canActivate: [IsLoginedGuard]
  },
  {
    path: 'myinfo',
    loadChildren: () => import('./page/myinfo/myinfo.module').then( m => m.MyinfoPageModule),
    canActivate: [IsLoginedGuard]
  },
  {
    path: 'set-permission',
    loadChildren: () => import('./page/set-permission/set-permission.module').then( m => m.SetPermissionPageModule),
    canActivate: [IsLoginedGuard]
  },
  {
    path: 'validation-order',
    loadChildren: () => import('./page/validation-order/validation-order.module').then( m => m.ValidationOrderPageModule)
  },
  {
    path: 'validation-order-list',
    loadChildren: () => import('./page/validation-order-list/validation-order-list.module').then( m => m.ValidationOrderListPageModule)
  },
  {
    path: 'sals-order',
    loadChildren: () => import('./page/sals-order/sals-order.module').then( m => m.SalsOrderPageModule)
  },
  {
    path: 'product-model',
    loadChildren: () => import('./page/product-model/product-model.module').then( m => m.ProductModelPageModule)
  },
  {
    path: 'read-sals-order',
    loadChildren: () => import('./page/read-sals-order/read-sals-order.module').then( m => m.ReadSalsOrderPageModule)
  },
  {
    path: 'read-sals-order-categories',
    loadChildren: () => import('./page/read-sals-order-categories/read-sals-order-categories.module').then( m => m.ReadSalsOrderCategoriesPageModule)
  },
  {
    path: 'view-command-with-filter',
    loadChildren: () => import('./page/view-command-with-filter/view-command-with-filter.module').then( m => m.ViewCommandWithFilterPageModule)
  },
  {
    path: 'stock-list',
    loadChildren: () => import('./page/stock-list/stock-list.module').then( m => m.StockListPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
