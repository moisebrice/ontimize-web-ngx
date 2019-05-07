import { CommonModule } from '@angular/common';
import { Component, Injector, NgModule } from '@angular/core';
import { MatSnackBarRef } from '@angular/material';

import { OTranslateModule } from '../../pipes/o-translate.pipe';
import { OSharedModule } from '../../shared';

export declare type OSnackBarIconPosition = 'left' | 'right';

/**
 * Configuration for showing a SnackBar with the SnackBar service.
 */
export class OSnackBarConfig {
  /** Text shown in the action button. */
  public action?: string;
  /** Time the SnackBar is shown. */
  public milliseconds?: number;
  /** Material icon shown in the SnackBar. */
  public icon?: string;
  /** Position where the icon is shown. Default left. */
  public iconPosition?: OSnackBarIconPosition;
  /** CSS class to be added to the snack bar container */
  public cssClass?: string;
}

@Component({
  moduleId: module.id,
  selector: 'o-snackbar',
  templateUrl: 'o-snackbar.component.html',
  styleUrls: ['o-snackbar.component.scss'],
  host: {
    '[class.o-snackbar]': 'true'
  }
})
export class OSnackBarComponent {

  public message: string;
  public action: string;
  public icon: string;
  public iconPosition: OSnackBarIconPosition = 'left';

  protected snackBarRef: MatSnackBarRef<{}>;

  constructor(
    protected injector: Injector
  ) {
    this.snackBarRef = this.injector.get(MatSnackBarRef);
  }

  public open(message: string, config?: OSnackBarConfig): void {
    this.message = message;
    if (config) {
      if (config.action) {
        this.action = config.action;
      }
      if (config.icon) {
        this.icon = config.icon;
      }
      if (config.iconPosition) {
        this.iconPosition = config.iconPosition;
      }
    }
  }

  public onAction(e: Event): void {
    this.snackBarRef.closeWithAction();
  }

}

@NgModule({
  declarations: [OSnackBarComponent],
  imports: [CommonModule, OSharedModule, OTranslateModule],
  exports: [CommonModule, OSnackBarComponent]
})
export class OSnackBarModule { }
