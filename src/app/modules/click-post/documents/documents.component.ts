import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ComponentInitilizer } from 'src/app/shared/component-initilizer';
import { DocumentFormComponent } from './document-form/document-form.component';
import { DocumentPreviewComponent } from './document-preview/document-preview.component';
declare var $: any;
@Component({
  selector: 'ocs-documents',
  templateUrl: './documents.component.html',
})
export class DocumentsComponent implements AfterViewInit, OnInit {
  connectedTo: any[] = [];
  extendedCard: string;
  @Input('documentData') documentData: any[];
  @ViewChild('textSelectedComponent')
  textSelectedComponent: DocumentFormComponent;
  @ViewChild('documentPreview') documentPreview: DocumentPreviewComponent;
  selectedItem: any;
  constructor(private componentInitializer: ComponentInitilizer) {}
  ngOnInit(): void {
    this.createDragAndDropGroup();
  }
  createDragAndDropGroup() {
    this.connectedTo = [];
    for (let item of this.documentData) {
      this.connectedTo.push(item.id.toString());
    }
  }
  ngAfterViewInit(): void {
    let that = this;
    this.componentInitializer.setExpandableTable();
    this.componentInitializer.initialCard('.extend-card');
    $('[card-id]').on('maximized.lte.cardwidget', function (data) {
      that.extendedCard = $(this).attr('card-id');
    });
    $('[card-id]').on('minimized.lte.cardwidget', function (data) {
      that.extendedCard = '';
    });

    $('[data-widget="expandable-table"]').on(
      'expanded.lte.expandableTable',
      (e) => {
        debugger;
        this.selectedItem = $(e.currentTarget).attr('index');
        // this.documentPreview.loadDocument(
        //   this.documentData[this.selectedItem].images[0]
        // );
      }
    );
  }

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
  currentDocumentChanged(data, id) {
    this.documentPreview.loadDocument(data, id);
  }
  splitDocument(data) {
    var currentDocument = this.documentData.findIndex(
      (element) => element.id == data.documentId
    );
    var currentPage = this.documentData[currentDocument].images.findIndex(
      (element) => element.id == data.page.id
    );
    debugger;
    this.documentData[currentDocument].images.splice(currentPage, 1);
    if (currentDocument) {
      this.documentData.splice(currentDocument, 1);
    }
    this.documentData.push({
      id: data.page.id,
      company: '',
      date: '',
      department: '',
      eMail: '',
      givenNames: '',
      images: [data.page],
      note: '',
      sender: '',
      subject: '',
      surname: '',
    });
    this.documentPreview.loadDocument(
      this.documentData[currentDocument].images[0],
      data.page.id
    );
    this.createDragAndDropGroup();
  }
}
