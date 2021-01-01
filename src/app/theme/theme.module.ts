import {NgModule} from '@angular/core';
import { 
  NbAccordionModule,
  NbActionsModule, 
  NbCardModule, 
  NbContextMenuModule, 
  NbIconModule, 
  NbLayoutModule, 
  NbListModule, 
  NbSidebarModule, 
  NbSidebarService, 
  NbThemeService, 
  NbTreeGridModule, 
  NbUserModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbAuthService, NbTokenService, NbTokenStorage } from '@nebular/auth';

@NgModule({
  exports: [
    NbLayoutModule,
    NbActionsModule,
    NbSidebarModule,
    NbContextMenuModule,
    NbEvaIconsModule,
    NbIconModule,
    NbTreeGridModule,
    NbUserModule,
    NbListModule,
    NbCardModule,
    NbAccordionModule
  ],
  providers: [
    NbThemeService,
    NbSidebarService,
    NbAuthService,
    NbTokenService],
})
export class ThemeModule {}
