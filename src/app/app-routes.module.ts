// Core
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// Modules
import { PagesRoutingModule } from './pages/pages.routing';
// Components
import { LoginComponent } from './auth/login/login.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PagesRoutingModule,
    RouterModule.forRoot( routes )
  ]
})
export class AppRoutesModule { }
