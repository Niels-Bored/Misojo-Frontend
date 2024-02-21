import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/authentication/sign-up/sign-up.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { HomeComponent } from './components/home/home/home.component';
import { MyLibraryComponent } from './components/home/my-library/my-library.component';
import { PublicLibraryComponent } from './components/home/public-library/public-library.component';
import { RecomendationsComponent } from './components/home/recomendations/recomendations.component';
import { UploadFileComponent } from './components/home/upload-file/upload-file.component';
import { ReportErrorComponent } from './components/home/report-error/report-error.component';
import { AboutUsComponent } from './components/home/about-us/about-us.component';
import { SettingsComponent } from './components/home/settings/settings.component';
import { AuthenticationGuardService } from './services/authentication-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthenticationGuardService],
    children: [
      {
        path: 'mylibrary',
        component: MyLibraryComponent,
        canActivate: [AuthenticationGuardService],
      },
      {
        path: 'public',
        component: PublicLibraryComponent,
        canActivate: [AuthenticationGuardService],
      },
      {
        path: 'recomendations',
        component: RecomendationsComponent,
        canActivate: [AuthenticationGuardService],
      },
      {
        path: 'upload',
        component: UploadFileComponent,
        canActivate: [AuthenticationGuardService],
      },
      {
        path: 'report',
        component: ReportErrorComponent,
        canActivate: [AuthenticationGuardService],
      },
      {
        path: 'about',
        component: AboutUsComponent,
        canActivate: [AuthenticationGuardService],
      },
      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [AuthenticationGuardService],
      },
      {
        path: '',
        pathMatch: "full",
        redirectTo:'home/mylibrary',
      }
    ]
  },
  /* {
    path: '**',
    loadChildren: () => import("@common/lib/components/error-page/error-page.module").then(module => module.ErrorPageModule)
  } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
