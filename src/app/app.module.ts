import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemeModule } from './theme/theme.module';
import { NbDatepickerModule, NbMenuModule, NbThemeModule, NbToastrModule, NbWindowModule } from '@nebular/theme';
import { HomePageComponent } from './pages/home-page/home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { NbRoleProvider, NbSecurityModule } from '@nebular/security';
import { RoleProvider } from './services/role/role.provider';
import { NbAuthJWTToken, NbAuthModule, NbAuthToken, NbPasswordAuthStrategy } from '@nebular/auth';
import { MySoccersPageComponent } from './pages/my-soccers-page/my-soccers-page/my-soccers-page.component';
import { FormSoccerComponent } from './pages/form-soccer/form-soccer/form-soccer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatchSoccerPageComponent } from './pages/match-soccer-page/match-soccer-page/match-soccer-page.component';
import { FormMatchComponent } from './pages/form-match/form-match/form-match.component';
import { ViewSoccerMatchesComponent } from './pages/view-soccer-matches/view-soccer-matches/view-soccer-matches.component';
import { MatchesPageComponent } from './pages/matches-page/matches-page/matches-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MySoccersPageComponent,
    FormSoccerComponent,
    MatchSoccerPageComponent,
    FormMatchComponent,
    ViewSoccerMatchesComponent,
    MatchesPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbMenuModule.forRoot(),
    ThemeModule,
    HttpClientModule,
    NbWindowModule.forRoot(),
    NbDatepickerModule.forRoot(),
    ReactiveFormsModule,
    NbToastrModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          token:{
            key: 'token',
            class:NbAuthJWTToken
          },
          baseEndpoint: 'http://localhost:8080',
          login: {
            endpoint: '/api/auth/login',
            method: 'post',
            redirect: {
              success: '/home',
              failure: null
            }
          },
          register: {
            endpoint: '/api/auth/register',
            method: 'post',
          },
          logout: {
            endpoint: '/api/auth/sign-out',
            method: 'post',
          },
        }),
      ],
      forms: {
        login:{
          showMessages: {
            success: true,
          }
        }
      },
    }), 
    NbSecurityModule.forRoot({
      accessControl: {
        user: {
          type: 'agent'
        }
      },
    }),
  ],
  providers: [
    { provide: NbRoleProvider, useClass: RoleProvider }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
