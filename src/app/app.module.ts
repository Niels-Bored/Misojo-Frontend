import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SignUpComponent } from './components/authentication/sign-up/sign-up.component';
import { LabelComponent } from './components/controls/label/label.component';
import { ButtonComponent } from './components/controls/button/button.component';
import { InputComponent } from './components/controls/input/input.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { SpinnerComponent } from './components/controls/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LabelComponent,
    ButtonComponent,
    InputComponent,
    LoginComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
