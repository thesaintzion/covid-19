import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from '../_layouts/main-layout/main-layout.component';
import { MainHomeComponent } from './main-home/main-home.component';


const routes: Routes = [
  {path: '', component: MainLayoutComponent, children: [
    {path: '', component: MainHomeComponent}]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
