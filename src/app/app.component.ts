import { Component } from '@angular/core';
import { NbAuthJWTToken, NbAuthService, NbAuthToken } from '@nebular/auth';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user:any = {}
  items: NbMenuItem[] = []
  // userMenu = [ { title: 'Log out', link: '/auth/logout' } ];
  constructor(
    private sidebarService: NbSidebarService,
    private authService: NbAuthService
  ) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthToken) => {
        console.log(token)
        if (token.isValid()) {
          this.user = token.getPayload()
          this.items = [
            {
              title: 'Home',
              icon: 'home-outline',
              link: '/home',
              home: true
            },
            {
              title: 'Matches',
              icon: 'flag-outline',
              link: '/matches'
            },
            {
              title: 'My Soccers',
              icon: 'list-outline',
              link: '/my-soccers'
            }
          ]
        }else{
          this.items = [
            {
              title: 'Home',
              icon: 'home-outline',
              link: '/home',
              home: true
            },
            {
              title: 'Matches',
              icon: 'flag-outline',
              link: '/matches'
            },
            {
              title: 'Login',
              icon: 'log-in-outline',
              link: '/auth/login'
            },
            {
              title: 'Register',
              icon: 'person-outline',
              link: '/auth/register'
            }
          ]
        }
      });
  }

  toggle() {
    this.sidebarService.toggle(true, 'menu');
  }

  logout(){

  }
}
