import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NbAuthComponent, NbLoginComponent, NbRegisterComponent, NbLogoutComponent, NbRequestPasswordComponent, NbResetPasswordComponent } from '@nebular/auth';
import { HomePageComponent } from './home-page/home-page/home-page.component';
import { MatchesPageComponent } from './matches-page/matches-page/matches-page.component';
import { MySoccersPageComponent } from './my-soccers-page/my-soccers-page/my-soccers-page.component';

const routes: Routes = [
  {path: '', redirectTo: 'home',pathMatch:'full'},
  {path: 'home',component:HomePageComponent},
  {path: 'matches', component: MatchesPageComponent},
  {path: 'my-soccers', component: MySoccersPageComponent},
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
