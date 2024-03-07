import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PigWeightRegistrationComponent } from './components/pig-weight-registration/pig-weight-registration.component';
import { PiglistComponent } from './components/piglist/piglist.component';
import { PigWeightListComponent } from './components/pig-weight-list/pig-weight-list.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { authGuard } from './services/guards/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: '/suinos', pathMatch: 'full', },
  { path: 'suinos', component: PiglistComponent, canActivate: [authGuard] },
  { path: 'pesos', component: PigWeightListComponent, canActivate: [authGuard] },
  { path: 'login', component: AuthenticationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
