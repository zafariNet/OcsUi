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
import { Select2Component } from './components/select2/select2.component';

import { ButtonBusyDirective } from './directives/button-busy.directive';

@NgModule({
  declarations: [ButtonBusyDirective, Select2Component],
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
  ],
  exports: [
    ButtonBusyDirective,
    NgxSpinnerModule,
    NgxPaginationModule,
    Select2Component,
    FormsModule,
  ],
  providers: [BsModalService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
