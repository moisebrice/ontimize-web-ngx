import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Inject,
  Injector,
  NgModule,
  Optional,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatInput } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { InputConverter } from '../../decorators';
import { OSharedModule } from '../../shared';
import { OFormComponent } from '../form/o-form.component';
import { OFormValue } from '../form/OFormValue';
import { DEFAULT_INPUTS_O_FORM_DATA_COMPONENT, OFormDataComponent } from '../o-form-data-component.class';

export const DEFAULT_INPUTS_O_IMAGE = [
  ...DEFAULT_INPUTS_O_FORM_DATA_COMPONENT,
  'emptyimage: empty-image',
  // empty-icon [string]: material icon. Default: photo.
  'emptyicon: empty-icon',
  // show-controls [yes|no true|false]: Shows or hides selection controls. Default: true.
  'showControls: show-controls',
  //height [% | px]: Set the height of the image.
  'height',
  // auto-fit [yes|no true|false]: Adjusts the image to the content or not. Default: true.
  'autoFit: auto-fit'
];

export const DEFAULT_OUTPUTS_O_IMAGE = [
  'onChange'
];

@Component({
  selector: 'o-image',
  templateUrl: './o-image.component.html',
  styleUrls: ['./o-image.component.scss'],
  inputs: DEFAULT_INPUTS_O_IMAGE,
  outputs: DEFAULT_OUTPUTS_O_IMAGE,
  encapsulation: ViewEncapsulation.None
})
export class OImageComponent extends OFormDataComponent {

  public static DEFAULT_INPUTS_O_IMAGE = DEFAULT_INPUTS_O_IMAGE;
  public static DEFAULT_OUTPUTS_O_IMAGE = DEFAULT_OUTPUTS_O_IMAGE;

  emptyimage: string;
  emptyicon: string;
  height: string;

  onChange: EventEmitter<Object> = new EventEmitter<Object>();

  @InputConverter()
  protected showControls: boolean = true;
  @InputConverter()
  autoFit: boolean = true;
  @ViewChild('inputControl')
  protected inputControl: MatInput;
  @ViewChild('input')
  protected fileInput: ElementRef;
  @ViewChild('titleLabel')
  protected titleLabel: ElementRef;
  protected _useEmptyIcon: boolean = true;
  protected _useEmptyImage: boolean = false;
  protected _domSanitizer: DomSanitizer;


  constructor(
    @Optional() @Inject(forwardRef(() => OFormComponent)) form: OFormComponent,
    elRef: ElementRef,
    injector: Injector) {
    super(form, elRef, injector);
    this._domSanitizer = this.injector.get(DomSanitizer);
    this._defaultSQLTypeKey = 'BASE64';
  }

  ngOnInit() {
    this.initialize();

    if (this.emptyimage && this.emptyimage.length > 0) {
      this._useEmptyIcon = false;
      this._useEmptyImage = true;
    }

    if (this.emptyicon === undefined && !this._useEmptyImage) {
      this.emptyicon = 'photo';
      this._useEmptyIcon = true;
      this._useEmptyImage = false;
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  ensureOFormValue(val: any) {
    if (val instanceof OFormValue) {
      if (val.value && val.value['bytes'] !== undefined) {
        this.value = new OFormValue(val.value.bytes);
        return;
      }
      this.value = new OFormValue(val.value);
    } else if (val && !(val instanceof OFormValue)) {
      if (val['bytes'] !== undefined) {
        val = val['bytes'];
      } else if (val.length > 300 && val.substring(0, 4) === 'data') {
        // Removing "data:image/*;base64,"
        val = val.substring(val.indexOf('base64') + 7);
      }
      this.value = new OFormValue(val);
    } else {
      this.value = new OFormValue(undefined);
    }
  }

  innerOnChange(event: any) {
    if (this._fControl && this._fControl.touched) {
      this._fControl.markAsDirty();
    }
    this.onChange.emit(event);
  }

  isEmpty(): boolean {
    return !this.getValue() || this.getValue().length === 0;
  }

  fileChange(input): void {
    if (input.files[0]) {
      var reader = new FileReader();
      var self = this;
      reader.addEventListener('load', (event) => {
        let result = event.target['result'];
        if (result && result.length > 300 && result.substring(0, 4) === 'data') {
          // Removing "data:image/*;base64,"
          result = result.substring(result.indexOf('base64') + 7);
        }
        self.setValue(result);
        if (self._fControl) {
          self._fControl.markAsTouched();
        }
        event.stopPropagation();
      }, false);
      if (input.files[0]) {
        reader.readAsDataURL(input.files[0]);
      }
      if (this.titleLabel) {
        this.titleLabel.nativeElement.textContent = input.files[0]['name'];
      }
    }
  }

  getSrcValue() {
    if (this.value && this.value.value) {
      if (this.value.value instanceof Object && this.value.value.bytes) {
        let src: string = '';
        if (this.value.value.bytes.substring(0, 4) === 'data') {
          src = 'data:image/png;base64,' + this.value.value.bytes.substring(this.value.value.bytes.indexOf('base64') + 7);
        } else {
          src = 'data:image/png;base64,' + this.value.value.bytes;
        }

        return this._domSanitizer.bypassSecurityTrustUrl(src);
      } else if (typeof this.value.value === 'string' &&
        this.value.value.length > 300) {
        let src: string = '';
        if (this.value.value.substring(0, 4) === 'data') {
          src = 'data:image/png;base64,' + this.value.value.substring(this.value.value.indexOf('base64') + 7);
        } else {
          src = 'data:image/png;base64,' + this.value.value;
        }

        return this._domSanitizer.bypassSecurityTrustUrl(src);
      }
      return this.value.value ? this.value.value : this.emptyimage;
    } else if (this.emptyimage) {
      return this.emptyimage;
    }
  }

  onClickBlocker(evt: Event) {
    evt.stopPropagation();
  }

  onClickClear(e: Event): void {
    e.stopPropagation();
    if (!this.isReadOnly && !this.isDisabled) {
      this.setValue(undefined);
      this.fileInput.nativeElement.valueOf = undefined;
      if (this.titleLabel) {
        this.titleLabel.nativeElement.textContent = '';
      }
    }
    if (this._fControl) {
      this._fControl.markAsTouched();
    }
  }

  hasControls(): boolean {
    return this.showControls;
  }

  useEmptyIcon(): boolean {
    return this._useEmptyIcon && this.isEmpty();
  }

  useEmptyImage(): boolean {
    return this._useEmptyImage && this.isEmpty();
  }

  getFormGroup(): FormGroup {
    let formGroup: FormGroup = super.getFormGroup();
    if (!formGroup) {
      formGroup = new FormGroup({});
      formGroup.addControl(this.getAttribute(), this.getControl());
    }
    return formGroup;
  }

  @HostBinding('style.height')
  get hostHeight() {
    return this.height;
  }
}

@NgModule({
  declarations: [OImageComponent],
  imports: [OSharedModule, CommonModule],
  exports: [OImageComponent]
})
export class OImageModule {
}
