import { Component, Inject, Injector, forwardRef, ElementRef, NgModule, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { OSharedModule } from '../../../shared';
import { OBarMenuComponent } from '../o-bar-menu.component';
import { OBaseMenuItemClass } from '../o-base-menu-item.class';

export const DEFAULT_INPUTS_O_LOCALE_BAR_MENU_ITEM = [
  ...OBaseMenuItemClass.DEFAULT_INPUTS_O_BASE_MENU_ITEM,
  // locale [string]: language. For example: es
  'locale'
];

@Component({
  moduleId: module.id,
  selector: 'o-locale-bar-menu-item',
  templateUrl: './o-locale-bar-menu-item.component.html',
  styleUrls: ['./o-locale-bar-menu-item.component.scss'],
  inputs: DEFAULT_INPUTS_O_LOCALE_BAR_MENU_ITEM,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.o-locale-bar-menu-item]': 'true'
  }
})
export class OLocaleBarMenuItemComponent extends OBaseMenuItemClass {

  public static DEFAULT_INPUTS_O_LOCALE_BAR_MENU_ITEM = DEFAULT_INPUTS_O_LOCALE_BAR_MENU_ITEM;

  locale: string;

  constructor(
    @Inject(forwardRef(() => OBarMenuComponent)) protected menu: OBarMenuComponent,
    protected elRef: ElementRef,
    protected injector: Injector
  ) {
    super(menu, elRef, injector);
  }

  configureI18n() {
    if (this.isConfiguredLang()) {
      return;
    }
    if (this.translateService) {
      this.translateService.use(this.locale);
    }
    if (this.menu) {
      this.menu.collapseAll();
    }
  }

  isConfiguredLang() {
    if (this.translateService) {
      return (this.translateService.getCurrentLang() === this.locale);
    }
    return false;
  }
}

@NgModule({
  declarations: [OLocaleBarMenuItemComponent],
  imports: [OSharedModule, CommonModule, RouterModule],
  exports: [OLocaleBarMenuItemComponent]
})
export class OLocaleBarMenuItemModule {
}
