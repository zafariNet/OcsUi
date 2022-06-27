import { AfterViewInit, Component } from '@angular/core';
import { ComponentInitilizer } from 'src/app/shared/component-initilizer';

@Component({
  selector: 'action-button-container',
  templateUrl: './top-buttons.component.html',
})
export class TopButtonsComponent implements AfterViewInit {
  constructor(private componentInitilizer: ComponentInitilizer) {}
  ngAfterViewInit(): void {
    this.componentInitilizer.fixTopButtons();
  }
}
