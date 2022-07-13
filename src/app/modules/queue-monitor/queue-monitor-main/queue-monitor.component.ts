import {
  AfterViewInit,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ShowXmlModalComponent } from '../show-xml-modal/show-xml-modal.component';
import { EditXmlComponent } from '../edit-xml-modal/edit-xml-modal.component';
import { SignalRService } from 'src/app/shared/service-proxies/signalr.service';
import { GlobalModelService } from 'src/app/account/services/global-model.service';
declare var $: any;
@Component({
  selector: 'ocs-queue-monitor',
  templateUrl: './queue-monitor.component.html',
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('300ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class QueueMonitorComponent implements AfterViewInit {
  data: any = {};
  gettingData: boolean = false;
  modalRef: BsModalRef;
  @ViewChild('showXmlModal') modal: ShowXmlModalComponent;
  @ViewChild('editXmlModal') editXmlModal: EditXmlComponent;
  constructor(
    private signalRService: SignalRService,
    public globalModelService: GlobalModelService
  ) {
    this.data['Scan-To-File'] = [];
    this.data['Scan-Work'] = [];
  }
  showXmlData(name: string) {
    this.modal.showModal(name);
  }
  showEditXml(name: string) {
    this.editXmlModal.showModal(name);
  }
  fileReaderRunnigService: boolean = false;
  ngAfterViewInit(): void {
    setTimeout(() => {
      $('#tree1').treed();
    }, 100);
  }
  startAddressService() {
    this.gettingData = true;
    setTimeout(() => {
      this.fileReaderRunnigService = true;
      this.gettingData = false;
    }, 2000);
  }
  clearScanToFileQueue() {
    this.data['Scan-To-File'] = [];
  }
  clearOCRWorkQueue() {
    this.data['OCR-Work'] = [];
  }
  clearScanWorkQueue() {
    this.data['Scan-Work'] = [];
  }
  moveAlltoScanWorkQueue() {
    this.data['OCR-Work'].forEach((element: any) => {
      this.data['Scan-Work'].push(element);
    });
    this.data['OCR-Work'] = [];
  }
  MoveToScanFile(index: number) {
    debugger;
    var removeItem = this.data['Scan-Work'].splice(index, 1);
    this.data['Scan-To-File'].push({
      id: removeItem[0].id,
      name: removeItem[0].name,
    });
  }
}
