import { Injectable } from "@angular/core";
import { LogedInUserViewModel } from "src/app/service-proxies/service-proxies";

@Injectable({
    providedIn : 'any'
})
export class GlobalModelService{
    logedInUser : LogedInUserViewModel;
}