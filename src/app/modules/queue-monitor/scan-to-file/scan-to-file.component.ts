import { animate, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, Injector, ViewChild } from '@angular/core';

import { GlobalModelService } from 'src/app/account/services/global-model.service';
import { AppBaseComponent } from 'src/app/app-base.component';
import {
  FileService,
  QueueMonitorFileListViewModel,
} from 'src/app/service-proxies/service-proxies';
import { SignalRService } from 'src/app/shared/service-proxies/signalr.service';
import { FileListModalComponent } from '../sub-component/file-list/file-list-modal.component';
import { PdfPreviewModalComponent } from '../sub-component/pdf-preview/pdf-preview.component';
declare var $: any;
@Component({
  selector: '[ocs-scan-to-file]',
  templateUrl: 'scan-to-file.component.html',
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class ScanToFileComponent extends AppBaseComponent {
  @ViewChild('pdfPreviewModal') pdfPreviewModal: PdfPreviewModalComponent;
  @ViewChild('fileListModal') fileListModal: FileListModalComponent;
  name: string = 'ScanToFile';
  displayName: string = 'Scan-To-Files';
  directory: string = 'Scan-to-File';
  fileAccessApi: string =
    'http://localhost:5232/api/File/GetFile/Scan-to-File/';
  constructor(
    private fileService: FileService,
    private http: HttpClient,
    injector: Injector,
    private signalRService: SignalRService
  ) {
    super(injector);
    this.createSignalRListener();
  }
  showPreview(file) {
    this.pdfPreviewModal.showModal(
      this.fileAccessApi + '&fileName=' + file.fileName
    );
  }

  showFileList() {
    this.fileListModal.showModal('Scan-to-File');
  }
  download(file: string) {
    fetch(this.fileAccessApi + '&fileName=' + file)
      .then((resp) => resp.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = file;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(() => alert('oh no!'));
  }

  deleteFile(fileName: string | undefined) {
    this.notificationService
      .showNewConfirm('Are you sure ?')
      .then((response) => {
        if (response) {
          this.fileService.deleteFile(this.directory, fileName).subscribe({
            next: (deleteResponye) => {
              this.notificationService.showSuccess('File deleted...');
            },
          });
        }
      });
  }

  deleteFiles() {
    this.notificationService
      .showNewConfirm('Are you sure ?')
      .then((response) => {
        debugger;
        if (response) {
          this.globalModelService.scanToFile.forEach((item) => {
            this.fileService
              .deleteFile(this.directory, item.fileName!)
              .subscribe({
                next: (deleteResponye) => {},
              });
          });

          this.notificationService.showSuccess('File deleted...');
        }
      });
  }
  createSignalRListener() {
    this.signalRService.hubConnection.on(this.name + '_Created', (data) => {
      this.globalModelService.scanToFile.push(data);
    });
    this.signalRService.hubConnection.on(this.name + 'Deleted', (data) => {
      var index = -1;
      this.globalModelService.scanToFile.filter((item, i) => {
        if (item.fileName == data) index = i;
      });

      this.globalModelService.scanToFile.splice(index, 1);
    });

    this.signalRService.hubConnection.on(this.name + '_Changed', (data) => {
      var index = -1;
      this.globalModelService.scanToFile.forEach((element, i) => {
        if (element.fileName == data.oldName) {
          var changedFile = new QueueMonitorFileListViewModel();
          changedFile.fileName = data.fileName;
          this.globalModelService.scanToFile[i] = changedFile;
        }
      });
    });
  }
}
