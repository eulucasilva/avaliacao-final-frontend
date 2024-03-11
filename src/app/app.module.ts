import { NgModule, LOCALE_ID } from '@angular/core';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { DateAdapter } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PigFormComponent } from './components/pig-form/pig-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatIconButton } from '@angular/material/button';;
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PigListComponent } from './components/pig-list/pig-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AgePipe } from './pipes/age.pipe';
import { initializeApp } from "firebase/app";
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
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PigDetailsComponent } from './components/pig-details/pig-details.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginator } from '@angular/material/paginator';
import { DatePtBrPipe } from './pipes/date-pt-br.pipe';
import { WeightHistoryComponent } from './components/weight-history/weight-history.component';
import { UserManualComponent } from './components/user-manual/user-manual.component';
import { MatExpansionModule } from '@angular/material/expansion';



export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


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
    PigFormComponent,
    PigListComponent,
    AgePipe,
    DeleteConfirmationComponent,
    PigWeightRegistrationComponent,
    MenuComponent,
    PigWeightListComponent,
    AuthenticationComponent,
    LoadingSpinnerComponent,
    PageNotFoundComponent,
    PigDetailsComponent,
    DatePtBrPipe,
    WeightHistoryComponent,
    UserManualComponent
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
    MatProgressSpinnerModule,
    MatMomentDateModule,
    MatDividerModule,
    MatPaginator,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatExpansionModule

  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: false } }, // Opções para o adapter Moment
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] }, // Adapter Moment
    { provide: HTTP_INTERCEPTORS, useClass: AutenticaInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
