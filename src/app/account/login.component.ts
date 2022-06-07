import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppBaseComponent } from '../app-base.component';
import {
  AccountService,
} from '../service-proxies/service-proxies';
@Component({
  selector: 'ocs-login',
  templateUrl: './login.component.html',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 })),
      ]),
      transition(':leave', [
        // :leave is alias to '* => void'
        animate(500, style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class LoginComponent extends AppBaseComponent implements OnInit {
  gettingData: boolean = false;
  showshowPage: boolean = false;
  loginForm: FormGroup;

  constructor(
    private accountService: AccountService,
    
    injector: Injector
  ) {
    super(injector);
  }
  ngOnInit(): void {
    
    this.globalModelService.applicationCanStart.next(false)
    this.tokenService.cleareTokens();
    this.createForm();
  }

  authenticate() {
    if (this.loginForm.valid) {
      this.gettingData = true;
      this.accountService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.globalModelService.logedInUser = response.value?.user!;
          this.tokenService.setLogedInUserData(response.value!);
          this.globalModelService.initialDataFeteched.next(true);
          this.globalModelService.applicationCanStart.next(true);
          this.router.navigate(['main/dashboard']);
        },
        error: (error) => {
          this.gettingData = false;
        },
      });
    } else {
      this.validateAllFields(this.loginForm);
    }
  }
  private createForm() {
    this.loginForm = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  showRequiredPassword(field) {
    if (this.loginForm)
      return (
        !this.loginForm.get(field)?.valid &&
        (this.loginForm.get(field)?.dirty || this.loginForm.get(field)?.touched)
      );
    return null;
  }
}
