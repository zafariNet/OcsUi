/**
 * desc：select2
 * how to use: <select2 [(ngModel)]='your_prop' [options]='your_options' [disabled]='your_condition' ></select2>
 */

import {
  Component,
  Input,
  Output,
  AfterViewInit,
  ElementRef,
  EventEmitter,
  OnChanges,
  OnDestroy,
  ViewEncapsulation,
  SimpleChanges,
} from '@angular/core';
import {
  CustomInputComponent,
  customInputAccessor,
} from './custom-input.component';

@Component({
  selector: 'select2',
  template: ` <div class="form-group">
    <label>{{ label }}</label>
    <select class="form-control select2bs4" [disabled]="disabled"></select>
    <div></div>
  </div>`,

  encapsulation: ViewEncapsulation.None,
  providers: [customInputAccessor(Select2Component)],
})
// ControlValueAccessor: A bridge between a control and a native element.
export class Select2Component
  extends CustomInputComponent
  implements OnChanges, OnDestroy, AfterViewInit
{
  @Input() options: any[] | undefined; // object: {id, text} or array: []
  @Input() disabled: boolean = false;
  @Input() label: string = '';
  @Output() onSelect = new EventEmitter<any>();

  /**
   * Added options that control how the visuals of select2 works
   **/
  @Input() settings: any;

  select2: any;
  private el: ElementRef;

  constructor(el: ElementRef) {
    super(() => {
      this.setSelect2Value();
    });
    this.el = el;
  }

  ngAfterViewInit() {
    this.setSelect2Value();
  }

  setSelect2Value() {
    if (this.model instanceof Array) {
      this.select2.val([...this.value]);
    } else {
      this.select2.val([this.value]);
    }
    this.select2.trigger('change');
  }

  ngOnChanges(changes: SimpleChanges) {
    // Merge both options and data
    let settings = { data: this.options || [] } as any;
    if (typeof this.settings === 'object') {
      settings = this.options
        ? Object.assign(this.settings, settings)
        : this.settings;
    }

    // Checking if the plugin is initialized
    if (this.select2 && this.select2.hasClass('select2-hidden-accessible')) {
      // Select2 has been initialized
      if (changes?.['options']) {
        // options change
        this.select2.empty();
        this.select2.select2(settings);
      } else if (changes?.['settings']) {
        // settings change
        if (settings.data) {
          this.select2.empty();
        }
        this.select2.select2(settings);
      }
      this.select2.trigger('change');
    } else {
      this.select2 = (<any>$(this.el.nativeElement).find('select')).select2(
        settings
      );
      this.select2.on('select2:select select2:unselect', (ev: any) => {
        const selectValue = this.select2.val();
        this.setValue(selectValue);
        const { id, text, selected } = ev['params']['data'];
        this.onSelect.emit({ id, text, selected });
      });
    }
    this.setSelect2Value();
  }

  ngOnDestroy() {
    this.select2.select2('destroy');
  }
}
