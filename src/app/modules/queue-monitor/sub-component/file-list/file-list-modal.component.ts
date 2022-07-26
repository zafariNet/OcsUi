import {
  Component,
  Injector,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { extend } from 'lodash';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { GlobalModelService } from 'src/app/account/services/global-model.service';
import { AppBaseComponent } from 'src/app/app-base.component';
import {
  FileListViewModel,
  FileService,
} from 'src/app/service-proxies/service-proxies';
import { ComponentInitilizer } from 'src/app/shared/component-initilizer';

@Component({
  selector: 'ocs-file-list-modal',
  templateUrl: 'file-list-modal.component.html',
})
export class FileListModalComponent extends AppBaseComponent {
  @ViewChild('fileListModal') modal: TemplateRef<any>;
  @Input('files') files: any;
  modalRef: BsModalRef;
  directory: string;
  list: FileListViewModel[] = [];
  selected: any[] = [];

  constructor(
    injector: Injector,

    private modalService: BsModalService,
    private fileService: FileService,
    private componentInitilizer: ComponentInitilizer
  ) {
    super(injector);
  }
  showModal(directory: any) {
    debugger;
    this.directory = directory;
    const config: ModalOptions = {
      class: 'modal-lg',
    };
    this.modalRef = this.modalService.show(this.modal, config);
    this.getFileList();
    setTimeout(() => {
      this.componentInitilizer.fixTopButtons();
      $('#target').contextmenu(function () {
        alert('Handler for .contextmenu() called.');
      });
    }, 100);
  }
  deleteFile(fileName: string | undefined) {
    debugger;
    this.notificationService
      .showNewConfirm('Are you sure ?')
      .then((response) => {
        if (response) {
          this.fileService.deleteFile(this.directory, fileName).subscribe({
            next: (deleteResponye) => {
              this.notificationService.showSuccess('File deleted...');
              this.getFileList();
            },
          });
        }
      });
  }

  deleteFiles() {
    this.notificationService
      .showNewConfirm('Are you sure ?')
      .then((response) => {
        if (response) {
          this.selected.forEach((item) => {
            this.fileService.deleteFile(this.directory, item.name).subscribe({
              next: (deleteResponye) => {
                this.getFileList();
              },
            });
          });
        }
      });
    this.notificationService.showSuccess('File deleted...');
  }
  getFileList() {
    this.fileService.getFileList(this.directory).subscribe((response) => {
      this.files = response.itemList!;
    });
  }
  download(file: string) {
    debugger;
    fetch(
      'https://localhost:7232/api/File/GetFile?directory=' +
        this.directory +
        '&fileName=' +
        file
    )
      .then((resp) => resp.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        // the filename you want
        a.download = file;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(() => alert('oh no!'));
  }
  getExtension(file: string) {
    var extension = file.substr(file.length - 3);
    return (
      'assets/img/file-extensions/' + extension.toLocaleLowerCase() + '.svg'
    );
  }
}
