import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './componets/page-not-found/page-not-found.component';
import { LayoutModule } from '@angular/cdk/layout';
import { SharedDialogComponent } from './componets/_dialog/shared-dialog/shared-dialog.component';
import { SharedModule } from './shared/shared.module';
import { ApiService } from './services/api.service';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    SharedDialogComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    SharedModule,
  ],
 providers: [ApiService],
 entryComponents:[SharedDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
