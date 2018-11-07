import { Pipe, PipeTransform, Injector } from '@angular/core';
import { CurrencyService } from '../services';

export interface ICurrencyPipeArgument {
  currencySimbol?: string;
  currencySymbolPosition?: string;
  grouping?: boolean;
  thousandSeparator?: string;
  decimalSeparator?: string;
  decimalDigits?: number;
}

@Pipe({
  name: 'oCurrency'
})
export class OCurrencyPipe implements PipeTransform {

  protected currencyService: CurrencyService;
  constructor(protected injector: Injector) {
    this.currencyService = this.injector.get(CurrencyService);
  }

  transform(text: string, args: ICurrencyPipeArgument): string {
    return this.currencyService.getCurrencyValue(text, args);
  }
}
