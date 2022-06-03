import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgxSpinnerModule } from "ngx-spinner";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { HeaderComponent } from "./header/header.component";
import { MainLayoutComponent } from "./main/main-layout.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


@NgModule({
    declarations :[MainLayoutComponent,HeaderComponent,SidebarComponent,BreadcrumbComponent],
    imports : [RouterModule, CommonModule,BrowserAnimationsModule ,NgxSpinnerModule],
    exports : [],
    providers : [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class LayoutModule{

}