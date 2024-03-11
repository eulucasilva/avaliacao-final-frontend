import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PigListComponent } from './components/pig-list/pig-list.component';
import { PigWeightListComponent } from './components/pig-weight-list/pig-weight-list.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { authGuard } from './services/guards/auth.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { WeightHistoryComponent } from './components/weight-history/weight-history.component';
import { UserManualComponent } from './components/user-manual/user-manual.component';


const routes: Routes = [
  { path: '', redirectTo: '/suinos', pathMatch: 'full', },
  { path: 'suinos', component: PigListComponent, canActivate: [authGuard] },
  { path: 'pesos', component: PigWeightListComponent, canActivate: [authGuard] },
  { path: 'monitoramento', component: WeightHistoryComponent, canActivate: [authGuard] },
  { path: 'manual', component: UserManualComponent, canActivate: [authGuard] },
  { path: 'login', component: AuthenticationComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
