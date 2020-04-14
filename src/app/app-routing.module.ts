import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './componets/page-not-found/page-not-found.component';



const routes: Routes = [
 {path: '404',  component: PageNotFoundComponent},
 { path: '', loadChildren: './componets/main-components/main.module#MainModule'},
  { path: '**',  redirectTo: '/404', pathMatch: 'full'}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
