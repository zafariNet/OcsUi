import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
declare var $: any;
@Component({
  selector: 'ocs-edit-xml-modal',
  templateUrl: './edit-xml-modal.component.html',
})
export class EditXmlComponent {
  @ViewChild('modalTemplate') modal: TemplateRef<any>;
  modalRef: BsModalRef;
  data: string;
  xml: string =
    '<ClickPostDocument> <ID>Scan-to-File-2203081425491919</ID> <MailConsignmentDocumentsCount>0</MailConsignmentDocumentsCount> <MailConsignmentId/> <MailConsignmentSequenceNumber>0</MailConsignmentSequenceNumber> <DateCreated/> <DateModified>2022-05-16T07:14:39.3280885Z</DateModified> <DateOfReceipt>2022-03-08T00:00:00.0000000+01:00</DateOfReceipt> <ConsecutiveNumber>0</ConsecutiveNumber> <DateSent/> <Company/> <Department/> <LastName/> <FirstName/> <Email/> <Sender/> <Subject/> <Comment/> <QuickDialEmails/> <DocumentSeparationBarcode/> <PdfFile/> <TifFile/> <Pages> <Page>Scan-to-File-2203081425491919</Page> <Page>Scan-to-File-2203081425508948</Page> <Page>Scan-to-File-2203111544409457</Page> <Page>Scan-to-File-2203071053408545</Page> <Page>Scan-to-File-2203111544418513</Page> <Page>Scan-to-File-2203111544413847</Page> <Page>Scan-to-File-2203111544425516</Page> <Page>Scan-to-File-2204041116300284</Page> <Page>Scan-to-File-2204041116310089</Page> <Page>Scan-to-File-2204220936027880</Page> </Pages> <IsJunk>false</IsJunk> <IsPageSequenceEquivalentToSourceDocument>false</IsPageSequenceEquivalentToSourceDocument> <CustomFields> <Field name="NewField">Mohammad</Field> </CustomFields> <VisitedMailrooms/> </ClickPostDocument>';
  constructor(private modalService: BsModalService) {}
  showModal(data: any) {
    const config: ModalOptions = { class: 'modal-xl' };
    this.data = data;
    this.modalRef = this.modalService.show(this.modal, config);
    setTimeout(() => {
       $('#xml').format({ method: 'xml' });
      this.load();
    }, 0);
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
