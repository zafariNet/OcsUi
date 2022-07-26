import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { QueueMonitorComponent } from './queue-monitor-main/queue-monitor.component';
import { ShowXmlModalComponent } from './show-xml-modal/show-xml-modal.component';
import { FormsModule } from '@angular/forms';
import { EditXmlComponent } from './edit-xml-modal/edit-xml-modal.component';
import { ScanToFileComponent } from './scan-to-file/scan-to-file.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfPreviewModalComponent } from './sub-component/pdf-preview/pdf-preview.component';
import { FileListModalComponent } from './sub-component/file-list/file-list-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { DragToSelectModule } from 'ngx-drag-to-select';
import { BaseQueueMonitorComponent } from './base-queue-monitor.component';

@NgModule({
  declarations: [
    QueueMonitorComponent,
    ScanToFileComponent,
    ShowXmlModalComponent,
    EditXmlComponent,
    PdfPreviewModalComponent,
    FileListModalComponent,
    BaseQueueMonitorComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    PdfViewerModule,
    HttpClientModule,
    DragToSelectModule.forRoot({ selectedClass: 'bg-info' }),
  ],
  exports: [],
})
export class QueueMonitorModule {}
