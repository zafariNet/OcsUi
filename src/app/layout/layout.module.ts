import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { HeaderComponent } from "./header/header.component";
import { MainLayoutComponent } from "./main/main-layout.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

@NgModule({
    declarations :[MainLayoutComponent,HeaderComponent,SidebarComponent,BreadcrumbComponent],
    imports : [RouterModule, CommonModule],
    exports : [],
    providers : []
})
export class LayoutModule{

}