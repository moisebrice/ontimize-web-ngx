import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdTooltipModule, MdDialogModule } from '@angular/material';

import {
  ColumnsFilterPipe,
  OrderByPipe,
  OIntegerPipe,
  ORealPipe,
  OTranslatePipe,
  OTranslateModule
} from './pipes';

import { ODialogComponent } from './components/dialog/o-dialog.component';

import { ONTIMIZE_DIRECTIVES } from './config/o-directives';

@NgModule({
  imports: [
    CommonModule,
    MdTooltipModule,
    MdDialogModule,
    OTranslateModule
  ],
  declarations: [
    ColumnsFilterPipe,
    OrderByPipe,
    OIntegerPipe,
    ORealPipe,
    ONTIMIZE_DIRECTIVES
  ],
  entryComponents: [
    ODialogComponent
  ],
  exports: [
    CommonModule,
    OTranslateModule,
    ColumnsFilterPipe,
    OrderByPipe,
    OIntegerPipe,
    ORealPipe,
    OTranslatePipe,
    ONTIMIZE_DIRECTIVES,
    MdTooltipModule,
    MdDialogModule
  ]
})
export class OSharedModule {
}
