import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { ButtonBusyDirective } from './directives/button-busy.directive';

@NgModule({
  declarations: [ButtonBusyDirective],
  imports: [
    CommonModule,
    ModalModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [ButtonBusyDirective],
  providers: [BsModalService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
