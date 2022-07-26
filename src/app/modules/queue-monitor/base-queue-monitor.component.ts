import { animate, style, transition, trigger } from '@angular/animations';
import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { GlobalModelService } from 'src/app/account/services/global-model.service';
import { AppBaseComponent } from 'src/app/app-base.component';
import {
  FileService,
  QueueMonitorFileListViewModel,
} from 'src/app/service-proxies/service-proxies';
import { SignalRService } from 'src/app/shared/service-proxies/signalr.service';
import { FileListModalComponent } from './sub-component/file-list/file-list-modal.component';

@Component({
  selector: '[ocs-queue-monitor]',
  templateUrl: './base-queue-monitor.component.html',
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('50ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class BaseQueueMonitorComponent
  extends AppBaseComponent
  implements OnInit
{
  @Input('displayName') displayName: string;
  @Input('name') name: string;
  @Input('type') type: string;
  @Input('directory') directory: string;
  @Input('file') file: string;
  @Input('dataSource') dataSource: string;
  @Input('titleClass') titleClass: string;
  @ViewChild('fileListModal') fileListModal: FileListModalComponent;
  @Output('showFile') showFile: EventEmitter<{
    directory: string;
    fileName: string;
  }> = new EventEmitter<{
    directory: string;
    fileName: string;
  }>();
  @Output('downloadFile') downloadFile: EventEmitter<{
    directory: string;
    fileName: string;
  }> = new EventEmitter<{
    directory: string;
    fileName: string;
  }>();
  @Output('deleteFile') deleteFile: EventEmitter<{
    directory: string;
    fileName: string;
  }> = new EventEmitter<{
    directory: string;
    fileName: string;
  }>();
  list: any[];
  constructor(
    injector: Injector,
    private signalRService: SignalRService,
    private fileService: FileService
  ) {
    super(injector);
    this.list = this.globalModelService[this.dataSource];
  }
  ngOnInit(): void {
    this.createListener();
    this.fileService.getFileList(this.directory).subscribe((response) => {
      this.globalModelService[this.dataSource] = response.itemList;
    });
  }
  showDirectory() {
    this.fileListModal.showModal(this.directory);
  }
  createListener() {
    this.signalRService.hubConnection.on(this.name + '_Created', (data) => {
      this.globalModelService[this.dataSource].push(data);
    });
    this.signalRService.hubConnection.on(this.name + '_Deleted', (data) => {
      var index = -1;
      this.globalModelService[this.dataSource].filter((item, i) => {
        if (item.fileName == data) index = i;
      });

      this.globalModelService[this.dataSource].splice(index, 1);
    });

    this.signalRService.hubConnection.on(this.name + '_Changed', (data) => {
      var index = -1;
      this.globalModelService[this.dataSource].forEach((element, i) => {
        if (element.fileName == data.oldName) {
          var changedFile = new QueueMonitorFileListViewModel();
          changedFile.fileName = data.fileName;
          this.globalModelService[this.dataSource][i] = changedFile;
        }
      });
    });
  }
  showPreviewFile(fileName: string): void {
    debugger;
    this.showFile.emit({ directory: this.directory, fileName: fileName });
  }
  downloadSelectedFile(fileName) {
    this.downloadFile.emit({ directory: this.directory, fileName: fileName });
  }
  deleteSelectedFile(fileName: string) {
    this.deleteFile.emit({ directory: this.directory, fileName: fileName });
  }
}
