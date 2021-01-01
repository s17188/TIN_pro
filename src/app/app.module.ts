import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemeModule } from './theme/theme.module';
import { NbMenuModule, NbThemeModule } from '@nebular/theme';
import { HomePageComponent } from './home-page/home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { NbRoleProvider, NbSecurityModule } from '@nebular/security';
import { RoleProvider } from './services/role/role.provider';
import { NbAuthJWTToken, NbAuthModule, NbAuthToken, NbPasswordAuthStrategy } from '@nebular/auth';
import { MySoccersPageComponent } from './my-soccers-page/my-soccers-page/my-soccers-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MySoccersPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbMenuModule.forRoot(),
    ThemeModule,
    HttpClientModule,
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
              success: '/',
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
        guest: {
          view: ['home'],
        },
        user: {
          parent: 'guest',
          create: 'soccer',
          edit: 'soccer',
          remove: 'soccer'
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
