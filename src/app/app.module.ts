import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PigformComponent } from './components/pigform/pigform.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PiglistComponent } from './components/piglist/piglist.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AgePipe } from './pipes/age.pipe';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { DeleteConfirmationComponent } from './components/delete-confirmation/delete-confirmation.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PigWeightRegistrationComponent } from './components/pig-weight-registration/pig-weight-registration.component';
import { MenuComponent } from './components/menu/menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { PigWeightListComponent } from './components/pig-weight-list/pig-weight-list.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { AutenticaInterceptor } from './components/authentication/autentica.interceptor';

const firebaseConfig = {
  apiKey: "AIzaSyDsQ3qopbdrlAcmRZWxll7jmu4thTmWgME",
  authDomain: "porco-tech-a61d6.firebaseapp.com",
  databaseURL: "https://porco-tech-a61d6-default-rtdb.firebaseio.com",
  projectId: "porco-tech-a61d6",
  storageBucket: "porco-tech-a61d6.appspot.com",
  messagingSenderId: "769979161988",
  appId: "1:769979161988:web:936195a47312ce73dc11d1"
};

const app = initializeApp(firebaseConfig);


@NgModule({
  declarations: [
    AppComponent,
    PigformComponent,
    PiglistComponent,
    AgePipe,
    DeleteConfirmationComponent,
    PigWeightRegistrationComponent,
    MenuComponent,
    PigWeightListComponent,
    AuthenticationComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCardModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatTableModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatMenuModule,
    MatTooltipModule,
    MatProgressSpinnerModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AutenticaInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
