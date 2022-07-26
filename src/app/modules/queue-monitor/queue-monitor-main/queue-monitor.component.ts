import {
  AfterViewInit,
  Component,
  Injector,
  OnInit,
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
import {
  FileService,
  QueueMonitorService,
  WatcherStatusViewModel,
} from 'src/app/service-proxies/service-proxies';
import { PdfPreviewModalComponent } from '../sub-component/pdf-preview/pdf-preview.component';
import { AppBaseComponent } from 'src/app/app-base.component';
declare var $: any;
@Component({
  selector: 'ocs-queue-monitor',
  templateUrl: './queue-monitor.component.html',
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('50ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class QueueMonitorComponent
  extends AppBaseComponent
  implements OnInit, AfterViewInit
{
  data: any = {};
  gettingData: boolean = false;
  toggledButtons: any[] = [];
  modalRef: BsModalRef;
  @ViewChild('showXmlModal') modal: ShowXmlModalComponent;
  @ViewChild('editXmlModal') editXmlModal: EditXmlComponent;
  @ViewChild('pdfPreviewModal') pdfPreviewModal: PdfPreviewModalComponent;
  fileAccessApi: string = 'https://localhost:5001/api/File/GetFile';
  loadEngingStarting: boolean = false;
  loadOcrAgentStarting: boolean = false;

  ocrEngineStarting: boolean = false;
  ocrEngineStarted;
  loadEnginServiceRunning: boolean = false;
  ocrAgentServiceRunning: boolean = false;
  addressRecognitionEnginStarting: boolean = false;
  addressEnginStarting: boolean = false;
  sendMailEngineStarting: boolean = false;
  services: WatcherStatusViewModel[] = [];
  constructor(
    private signalRService: SignalRService,
    private fileService: FileService,
    private queueMonitorService: QueueMonitorService,
    injector: Injector
  ) {
    super(injector);
    this.data['Scan-To-File'] = [];
    this.data['Scan-Work'] = [];
    this.data['Ocr-Work'] = [];
  }
  ngOnInit(): void {
    this.queueMonitorService.getScanToFileList('').subscribe((response) => {
      this.globalModelService.scanToFile = response.itemList!;
    });
    this.queueMonitorService
      .getScanWorkList('')
      .subscribe(
        (response) => (this.globalModelService.scanWork = response.itemList!)
      );
    this.queueMonitorService
      .getOcrList('')
      .subscribe(
        (response) => (this.globalModelService.scanWork = response.itemList!)
      );
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      $('#tree1').treed();
    }, 100);
  }
  started = true;
  toggleLoadEngine() {
    this.loadEngingStarting = true;
    this.loadEnginServiceRunning = false;
    this.queueMonitorService
      .startStopLoadEngin(!this.globalModelService.loadEnginStarted)
      .subscribe((response) => {
        this.loadEngingStarting = false;
        this.globalModelService.loadEnginStarted =
          !this.globalModelService.loadEnginStarted;
        this.loadEnginServiceRunning = true;
      });
  }
  toggleSendMailEnging() {
    this.sendMailEngineStarting = true;
    this.queueMonitorService
      .sendMailEngineToggle(!this.globalModelService.sendMailEngineStarted)
      .subscribe((response) => {
        this.sendMailEngineStarting = false;
        this.globalModelService.sendMailEngineStarted =
          !this.globalModelService.sendMailEngineStarted;
      });
  }
  toggleOcrEngine() {
    this.ocrEngineStarting = true;
    this.loadEnginServiceRunning = false;
    this.queueMonitorService
      .startOcrEngine(!this.globalModelService.ocrEngineStarted)
      .subscribe((response) => {
        this.ocrEngineStarting = false;
        this.started = !this.started;
        this.loadEnginServiceRunning = true;
        this.globalModelService.ocrEngineStarted =
          !this.globalModelService.ocrEngineStarted;
      });
  }
  toggleAddressEnginge() {
    this.addressEnginStarting = true;
    this.queueMonitorService
      .addressEngineToggle(!this.globalModelService.addressEngineStarted)
      .subscribe((response) => {
        this.addressEnginStarting = false;
        this.globalModelService.addressEngineStarted =
          !this.globalModelService.addressEngineStarted;
      });
  }
  toggleOcrAgent() {
    this.loadOcrAgentStarting = true;
    this.ocrAgentServiceRunning = false;
    this.queueMonitorService
      .startOcrAgent(!this.globalModelService.ocrAgentStarted)
      .subscribe((response) => {
        this.loadOcrAgentStarting = false;
        this.started = !this.started;
        this.ocrAgentServiceRunning = true;
        this.globalModelService.ocrAgentStarted =
          !this.globalModelService.ocrAgentStarted;
      });
  }
  clearOcrQueue() {
    this.queueMonitorService.clearOcrQueue().subscribe((response) => {
      this.globalModelService.ocrQueue = [];
    });
  }

  showPreviewFile(data) {
    debugger;
    this.pdfPreviewModal.showModal(
      this.fileAccessApi +
        '?directory=' +
        data.directory +
        '&fileName=' +
        data.fileName
    );
  }

  onDownloadFile(data) {
    debugger;
    fetch(
      this.fileAccessApi +
        '?directory=' +
        data.directory +
        '&fileName=' +
        data.fileName
    )
      .then((resp) => resp.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = data.fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(() => alert('downloaf field'));
  }

  onDeleteFile(data) {
    debugger;
    this.notificationService
      .showNewConfirm('Are you sure ?')
      .then((response) => {
        if (response) {
          this.fileService.deleteFile(data.directory, data.fileName).subscribe({
            next: (deleteResponye) => {
              this.notificationService.showSuccess('File deleted...');
            },
          });
        }
      });
  }
  openXmlFile() {
    this.fileService.getXmlData().subscribe((response) => {
      debugger;
      this.editXmlModal.showModal(response.message);
    });
  }
  goggleAddressRecognitionEngine() {
    this.addressRecognitionEnginStarting = true;

    this.queueMonitorService
      .addressRecognitionEngineToggle(
        !this.globalModelService.addressRecognitionEngineStarted
      )
      .subscribe((response) => {
        this.addressRecognitionEnginStarting = false;
        this.globalModelService.addressRecognitionEngineStarted =
          !this.globalModelService.addressRecognitionEngineStarted;
      });
  }
}
