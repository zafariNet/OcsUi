import { Component, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { TemplateRef } from '@angular/core';
declare var $: any;
@Component({
  selector: 'ocs-pdf-preview-modal',
  templateUrl: './pdf-preview.component.html',
})
export class PdfPreviewModalComponent {
  @ViewChild('modalTemplate') modal: TemplateRef<any>;
  modalRef: BsModalRef;
  file: string;

  constructor(private modalService: BsModalService) {}
  showModal(file: any) {
    const config: ModalOptions = {
      class: 'modal-lg',
    };
    this.file = file;
    this.modalRef = this.modalService.show(this.modal, config);
  }
}
