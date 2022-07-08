import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { ComponentInitilizer } from 'src/app/shared/component-initilizer';

@Component({
  selector: 'action-button-container',
  templateUrl: './top-buttons.component.html',
})
export class TopButtonsComponent implements AfterViewInit {
  @Output('searchDialogRequested') searchDialogRequested: EventEmitter<any> =
    new EventEmitter<any>();
  constructor(private componentInitilizer: ComponentInitilizer) {}
  ngAfterViewInit(): void {
    this.componentInitilizer.fixTopButtons();
  }
  showSearchDialog() {
    this.searchDialogRequested.emit();
  }
}
