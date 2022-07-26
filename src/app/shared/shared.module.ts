import { CDK_DRAG_CONFIG, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ComponentInitilizer } from './component-initilizer';
import { Select2Component } from './components/select2/select2.component';

import { ButtonBusyDirective } from './directives/button-busy.directive';
import { ServiceRunningDirective } from './directives/service-runnging.directive';
import { RouteGard } from './gaurds/route.gaurd';
import { PdfSafePipe } from './pipes/pdf-save.pipe';
const DragConfig = {
  dragStartThreshold: 0,
  pointerDirectionChangeThreshold: 5,
  zIndex: 10000,
};
@NgModule({
  declarations: [
    ButtonBusyDirective,
    Select2Component,
    ServiceRunningDirective,
    PdfSafePipe,
  ],
  imports: [
    CommonModule,
    ModalModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
    FormsModule,
    DragDropModule,
  ],
  exports: [
    ButtonBusyDirective,
    NgxSpinnerModule,
    NgxPaginationModule,
    Select2Component,
    FormsModule,
    DragDropModule,
    ServiceRunningDirective,
    PdfSafePipe,
  ],
  providers: [
    BsModalService,
    RouteGard,
    ComponentInitilizer,
    { provide: CDK_DRAG_CONFIG, useValue: DragConfig },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
