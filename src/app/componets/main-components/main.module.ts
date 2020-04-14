import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainLayoutComponent } from '../_layouts/main-layout/main-layout.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ScrollUpComponent } from './scroll-up/scroll-up.component';


@NgModule({
  declarations: [
    MainLayoutComponent,
    MainHomeComponent,
    ScrollUpComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
  ]
})
export class MainModule { }
