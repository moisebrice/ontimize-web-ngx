import { Component, NgModule, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OSharedModule } from '../../../shared';
import { DEFAULT_INPUTS_O_REAL_INPUT, DEFAULT_OUTPUTS_O_REAL_INPUT, ORealInputModule, ORealInputComponent } from '../real-input/o-real-input.component';

export const DEFAULT_INPUTS_O_CURRENCY_INPUT = [
  ...DEFAULT_INPUTS_O_REAL_INPUT,
  'currencySymbol: currency-symbol',
  'currencySymbolPosition: currency-symbol-position'
];

export const DEFAULT_OUTPUTS_O_CURRENCY_INPUT = [
  ...DEFAULT_OUTPUTS_O_REAL_INPUT
];

@Component({
  moduleId: module.id,
  selector: 'o-currency-input',
  templateUrl: './o-currency-input.component.html',
  styleUrls: ['./o-currency-input.component.scss'],
  inputs: DEFAULT_INPUTS_O_CURRENCY_INPUT,
  outputs: DEFAULT_OUTPUTS_O_CURRENCY_INPUT,
  encapsulation: ViewEncapsulation.None
})
export class OCurrencyInputComponent extends ORealInputComponent implements OnInit {

  public static DEFAULT_INPUTS_O_CURRENCY_INPUT = DEFAULT_INPUTS_O_CURRENCY_INPUT;
  public static DEFAULT_OUTPUTS_O_CURRENCY_INPUT = DEFAULT_OUTPUTS_O_CURRENCY_INPUT;

  currency_symbols = {
    'CRC': '₡', // Costa Rican Colón
    'NGN': '₦', // Nigerian Naira
    'PHP': '₱', // Philippine Peso
    'PLN': 'zł', // Polish Zloty
    'PYG': '₲', // Paraguayan Guarani
    'THB': '฿', // Thai Baht
    'UAH': '₴', // Ukrainian Hryvnia
    'VND': '₫', // Vietnamese Dong
  };

  static currency_icons = ['USD', 'EUR', 'GBP', 'ILS', 'INR', 'JPY', 'KRW', 'BTC'];

  currencySymbol: string = 'EUR';
  currencySymbolPosition: string = 'right';

  protected existsOntimizeIcon() {
    return OCurrencyInputComponent.currency_icons.indexOf(this.currencySymbol) !== -1;
  }

  useIcon(position: string): boolean {
    return this.existsOntimizeIcon() && this.currencySymbolPosition === position;
  }

  useSymbol(position: string): boolean {
    return this.currency_symbols.hasOwnProperty(this.currencySymbol) && this.currencySymbolPosition === position;
  }
}

@NgModule({
  declarations: [OCurrencyInputComponent],
  imports: [CommonModule, OSharedModule, ORealInputModule],
  exports: [OCurrencyInputComponent, ORealInputModule]
})
export class OCurrencyInputModule { }
