import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SignUpComponent } from './components/authentication/sign-up/sign-up.component';
import { LabelComponent } from './components/controls/label/label.component';
import { ButtonComponent } from './components/controls/button/button.component';
import { InputComponent } from './components/controls/input/input.component';
import { TextAreaComponent } from './components/controls/text-area/text-area.component';
import { SelectComponent } from './components/controls/select/select.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { SpinnerComponent } from './components/controls/spinner/spinner.component';
import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
import { NavbarComponent } from './components/controls/navbar/navbar.component';
import { LanguageSelectorComponent } from './components/controls/language-selector/language-selector.component';
import { HomeComponent } from './components/home/home/home.component';
import { MyLibraryComponent } from './components/home/my-library/my-library.component';
import { PublicLibraryComponent } from './components/home/public-library/public-library.component';
import { RecomendationsComponent } from './components/home/recomendations/recomendations.component';
import { UploadFileComponent } from './components/home/upload-file/upload-file.component';
import { ReportErrorComponent } from './components/home/report-error/report-error.component';
import { AboutUsComponent } from './components/home/about-us/about-us.component';
import { SettingsComponent } from './components/home/settings/settings.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    HomeComponent,
    MyLibraryComponent,
    PublicLibraryComponent,
    RecomendationsComponent,
    UploadFileComponent,
    ReportErrorComponent,
    AboutUsComponent,
    SettingsComponent,
    LabelComponent,
    ButtonComponent,
    InputComponent,
    TextAreaComponent,
    SelectComponent,
    SpinnerComponent,
    NavbarComponent,
    LanguageSelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
