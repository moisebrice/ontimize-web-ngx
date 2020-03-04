import { OTableCellRendererActionComponent } from './action/o-table-cell-renderer-action.component';
import { OTableCellRendererBooleanComponent } from './boolean/o-table-cell-renderer-boolean.component';
import { OTableCellRendererCurrencyComponent } from './currency/o-table-cell-renderer-currency.component';
import { OTableCellRendererDateComponent } from './date/o-table-cell-renderer-date.component';
import { OTableCellRendererImageComponent } from './image/o-table-cell-renderer-image.component';
import { OTableCellRendererIntegerComponent } from './integer/o-table-cell-renderer-integer.component';
import { OTableCellRendererPercentageComponent } from './percentage/o-table-cell-renderer-percentage.component';
import { OTableCellRendererRealComponent } from './real/o-table-cell-renderer-real.component';
import { OTableCellRendererServiceComponent } from './service/o-table-cell-renderer-service.component';
import { OTableCellRendererTimeComponent } from './time/o-table-cell-renderer-time.component';
import { OTableCellRendererTranslateComponent } from './translate/o-table-cell-renderer-translate.component';

export const O_TABLE_CELL_RENDERERS = [
  OTableCellRendererActionComponent,
  OTableCellRendererDateComponent,
  OTableCellRendererBooleanComponent,
  OTableCellRendererImageComponent,
  OTableCellRendererIntegerComponent,
  OTableCellRendererRealComponent,
  OTableCellRendererCurrencyComponent,
  OTableCellRendererPercentageComponent,
  OTableCellRendererServiceComponent,
  OTableCellRendererTranslateComponent,
  OTableCellRendererTimeComponent
];

export const O_TABLE_CELL_RENDERERS_INPUTS = [
  ...OTableCellRendererBooleanComponent.DEFAULT_INPUTS_O_TABLE_CELL_RENDERER_BOOLEAN,
  ...OTableCellRendererCurrencyComponent.DEFAULT_INPUTS_O_TABLE_CELL_RENDERER_CURRENCY, // includes Integer and Real
  ...OTableCellRendererDateComponent.DEFAULT_INPUTS_O_TABLE_CELL_RENDERER_DATE,
  ...OTableCellRendererImageComponent.DEFAULT_INPUTS_O_TABLE_CELL_RENDERER_IMAGE,
  ...OTableCellRendererActionComponent.DEFAULT_INPUTS_O_TABLE_CELL_RENDERER_ACTION,
  ...OTableCellRendererServiceComponent.DEFAULT_INPUTS_O_TABLE_CELL_RENDERER_SERVICE,
  ...OTableCellRendererTranslateComponent.DEFAULT_IPUTS_O_TABLE_CELL_RENDERER_TRANSLATE,
];

export const O_TABLE_CELL_RENDERERS_OUTPUTS = [
  ...OTableCellRendererActionComponent.DEFAULT_OUTPUTS_O_TABLE_CELL_RENDERER_ACTION
];

export const renderersMapping = {
  action: OTableCellRendererActionComponent,
  boolean: OTableCellRendererBooleanComponent,
  currency: OTableCellRendererCurrencyComponent,
  date: OTableCellRendererDateComponent,
  image: OTableCellRendererImageComponent,
  integer: OTableCellRendererIntegerComponent,
  percentage: OTableCellRendererPercentageComponent,
  real: OTableCellRendererRealComponent,
  service: OTableCellRendererServiceComponent,
  translate: OTableCellRendererTranslateComponent,
  time: OTableCellRendererTimeComponent
};
