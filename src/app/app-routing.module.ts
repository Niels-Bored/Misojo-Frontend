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
import { FollowUsComponent } from './components/home/follow-us/follow-us.component';
import { SettingsComponent } from './components/home/settings/settings.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signup',
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
    //canActivate: [AdminAuthenticationGuardService],
    children: [
      {
        path: 'mylibrary',
        component: MyLibraryComponent
      },
      {
        path: 'public',
        component: PublicLibraryComponent
      },
      {
        path: 'recomendations',
        component: RecomendationsComponent
      },
      {
        path: 'upload',
        component: UploadFileComponent
      },
      {
        path: 'report',
        component: ReportErrorComponent
      },
      {
        path: 'follow',
        component: FollowUsComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: '',
        pathMatch: "full",
        redirectTo:'home/mylibrary'
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
