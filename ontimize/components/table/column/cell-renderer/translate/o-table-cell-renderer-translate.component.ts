import { ChangeDetectionStrategy, Component, Injector, TemplateRef, ViewChild } from '@angular/core';

import { ITranslatePipeArgument, OTranslatePipe } from '../../../../../pipes';
import { OBaseTableCellRenderer, DEFAULT_INPUTS_O_BASE_TABLE_CELL_RENDERER } from '../o-base-table-cell-renderer.class';

export const DEFAULT_INPUTS_O_TABLE_CELL_RENDERER_TRANSLATE = [
  ...DEFAULT_INPUTS_O_BASE_TABLE_CELL_RENDERER,
  // translate-params [(rowData: any) => any[]]: function that receives the row data and return the parameters for the translate pipe.
  'translateArgsFn: translate-params'
];

@Component({
  moduleId: module.id,
  selector: 'o-table-cell-renderer-translate',
  templateUrl: './o-table-cell-renderer-translate.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: DEFAULT_INPUTS_O_TABLE_CELL_RENDERER_TRANSLATE
})
export class OTableCellRendererTranslateComponent extends OBaseTableCellRenderer {

  public static DEFAULT_INPUTS_O_TABLE_CELL_RENDERER_TRANSLATE = DEFAULT_INPUTS_O_TABLE_CELL_RENDERER_TRANSLATE;

  @ViewChild('templateref', { read: TemplateRef })
  public templateref: TemplateRef<any>;

  public translateArgsFn: (rowData: any) => any[];

  protected componentPipe: OTranslatePipe;
  protected pipeArguments: ITranslatePipeArgument = {};

  constructor(protected injector: Injector) {
    super(injector);

    this.tableColumn.type = 'translate';

    this.setComponentPipe();
  }

  public setComponentPipe(): void {
    this.componentPipe = new OTranslatePipe(this.injector);
  }

  public getCellData(cellvalue: any, rowvalue?: any): string {
    this.pipeArguments = this.translateArgsFn ? { values: this.translateArgsFn(rowvalue) } : {};
    return super.getCellData(cellvalue, rowvalue);
  }

}
