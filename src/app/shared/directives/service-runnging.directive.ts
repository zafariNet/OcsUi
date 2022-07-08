import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import * as _ from 'lodash';

@Directive({
  selector: '[serviceRunning]',
})
export class ServiceRunningDirective implements OnInit, AfterViewInit {
  @Input() set serviceRunning(running: boolean) {
    this.refreshState(running);
  }
  private _button: any;
  private _originalButtonInnerHtml: any;
  constructor(private _element: ElementRef) {}

  ngOnInit(): void {
    this._button = this._element.nativeElement;
  }

  ngAfterViewInit(): void {
    this._originalButtonInnerHtml = this._button.innerHTML;
  }

  refreshState(running: boolean): void {
    if (!this._button) {
      return;
    }
    console.log(this._button.id);
    this._button.removeAttribute('class');
    if (running) {
      this._button.setAttribute('class', 'fa fa-check text-success');
      this._button.setAttribute('name', 'fuck');
    } else {
      this._button.setAttribute('class', 'fa fa-circle text-danger');
      this._button.setAttribute('name', 'suck');
    }
  }
}
