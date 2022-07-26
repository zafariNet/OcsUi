import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
declare var $: any;
declare var CodeMirror: any;
declare var document: any;
@Component({
  selector: 'ocs-edit-xml-modal',
  templateUrl: './edit-xml-modal.component.html',
})
export class EditXmlComponent {
  @ViewChild('modalTemplate') modal: TemplateRef<any>;
  modalRef: BsModalRef;
  data: string;

  constructor(private modalService: BsModalService) {}
  showModal(data: any) {
    const config: ModalOptions = { class: 'modal-xl' };
    this.modalRef = this.modalService.show(this.modal, config);
    setTimeout(() => {
      debugger;
      document.getElementById('codeMirrorDemo').value = data;
      debugger;
      var xxx = document.getElementById('codeMirrorDemo');
      CodeMirror.fromTextArea(document.getElementById('codeMirrorDemo'), {
        mode: 'htmlmixed',
        theme: 'monokai',
      });
    }, 100);
  }
  formatXml() {
    $('#xml').format({ method: 'xml' });
  }

  load(): void {
    setTimeout(() => {
      // $('#xml').setXmlFormat('editor');
    }, 0);
  }
}
