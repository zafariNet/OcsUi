import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonBusyDirective } from "./directives/button-busy.directive";

@NgModule({
    declarations : [ButtonBusyDirective],
    imports : [CommonModule],
    exports : [ButtonBusyDirective],
    providers : []
})
export class SharedModule{

}