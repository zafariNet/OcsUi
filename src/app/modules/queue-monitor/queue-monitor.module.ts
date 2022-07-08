import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { QueueMonitorComponent } from './queue-monitor-main/queue-monitor.component';
import { ShowXmlModalComponent } from './show-xml-modal/show-xml-modal.component';
import { FormsModule } from '@angular/forms';
import { EditXmlComponent } from './edit-xml-modal/edit-xml-modal.component';

@NgModule({
  declarations: [
    QueueMonitorComponent,

    ShowXmlModalComponent,
    EditXmlComponent,
  ],
  imports: [SharedModule, CommonModule, FormsModule],
  exports: [],
})
export class QueueMonitorModule {}
