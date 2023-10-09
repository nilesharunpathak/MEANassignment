import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangeListComponent } from './pages/exchange-list/exchange-list.component';

const routes: Routes = [
  {
    path: "",
    component: ExchangeListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
