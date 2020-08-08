import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GravatarModule } from 'ngx-gravatar';
// Modules
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
// Components
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    GravatarModule,
    MatToolbarModule,
    MatMenuModule
  ]
})
export class SharedModule { }
