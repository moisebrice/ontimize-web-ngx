import {
  Component, Inject, forwardRef,
  NgModule,
  ViewEncapsulation
} from '@angular/core';

import { OSideMenuModule, OSideMenuComponent } from './o-side-menu.component';
import { OSharedModule } from '../../shared.module';

@Component({
  selector: 'o-side-menu-separator',
  template: require('./o-side-menu-separator.component.html'),
  styles: [require('./o-side-menu-separator.component.scss')],
  encapsulation: ViewEncapsulation.None
})
export class OSideMenuSeparatorComponent {

  protected menu: OSideMenuComponent;

  constructor( @Inject(forwardRef(() => OSideMenuComponent)) menu: OSideMenuComponent) {
    this.menu = menu;
  }

}

@NgModule({
  declarations: [OSideMenuSeparatorComponent],
  imports: [OSharedModule, OSideMenuModule],
  exports: [OSideMenuSeparatorComponent],
})
export class OSideMenuSeparatorModule {
}
