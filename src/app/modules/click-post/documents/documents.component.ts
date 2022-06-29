import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ComponentInitilizer } from 'src/app/shared/component-initilizer';
import { DocumentFormComponent } from './document-form/document-form.component';
declare var $: any;
@Component({
  selector: 'ocs-documents',
  templateUrl: './documents.component.html',
})
export class DocumentsComponent implements AfterViewInit, OnInit {
  connectedTo: any[] = [];
  extendedCard: string;

  @ViewChild('textSelectedComponent')
  textSelectedComponent: DocumentFormComponent;
  constructor(private componentInitializer: ComponentInitilizer) {}
  ngOnInit(): void {
    for (let item of this.documentData) {
      this.connectedTo.push(item.id.toString());
    }
  }
  ngAfterViewInit(): void {
    let that = this;
    this.componentInitializer.setExpandableTable();
    this.componentInitializer.initialCard('.extend-card', this.resizeCanvas);
    $('[card-id]').on('maximized.lte.cardwidget', function (data) {
      that.extendedCard = $(this).attr('card-id');
    });
    $('[card-id]').on('minimized.lte.cardwidget', function (data) {
      that.extendedCard = '';
    });
  }
  @Input('documentData') documentData: any[];
  showcard(data) {}
  setSelectedDocument(data) {
    let checked = data.currentTarget.checked;

    this.documentData.forEach((element) => {
      element.checked = checked;
    });
  }
  resizeCanvas(size) {}
  textSelected(data) {
    debugger;
    this.textSelectedComponent.setFomrData(data);
  }
  fuck() {
    alert('s');
  }
}
