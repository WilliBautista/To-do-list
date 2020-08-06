import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GravatarModule } from 'ngx-gravatar';
// Modules
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
    MatToolbarModule
  ]
})
export class SharedModule { }
