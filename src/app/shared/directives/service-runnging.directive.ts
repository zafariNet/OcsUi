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
    this._button = this._element.nativeElement;
    this.refreshState(running);
  }
  private _button: any;
  private _originalButtonInnerHtml: any;
  constructor(private _element: ElementRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this._originalButtonInnerHtml = this._button.innerHTML;
  }

  refreshState(running: boolean): void {
    if (!this._button) {
      return;
    }
    this._button.removeAttribute('class');
    if (running) {
      $('#' + this._button.id).attr('class', 'fa fa-check text-success');
    } else {
      $('#' + this._button.id).attr('class', 'fa fa-circle text-danger');
    }
  }
}
