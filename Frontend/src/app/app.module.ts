import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExchangeListComponent } from './pages/exchange-list/exchange-list.component';
import { FilterIconsPipe } from './pipes/filter-icons.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ExchangeListComponent,
    FilterIconsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
