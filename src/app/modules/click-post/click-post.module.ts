import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClickPostComponent } from './click-post.component';
import { DocumentFormComponent } from './documents/document-form/document-form.component';
import { DocumentPreviewComponent } from './documents/document-preview/document-preview.component';
import { DocumentTreeComponent } from './documents/document-tree/document-tree.component';
import { DocumentsComponent } from './documents/documents.component';
import { ClickPostService } from './top-buttons/click-post.service';
import { TopButtonsComponent } from './top-buttons/top-buttons.component';

@NgModule({
  imports: [
    CommonModule,
    DragDropModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  exports: [],
  declarations: [
    ClickPostComponent,
    TopButtonsComponent,
    DocumentsComponent,
    DocumentTreeComponent,
    DocumentFormComponent,
    DocumentPreviewComponent,
  ],
  providers: [ClickPostService],
})
export class ClickPostModule {}
