import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../service-proxies/service-proxies';
import { GlobalModelService } from './services/global-model.service';
import { LoginService } from './services/login.service';
import { TokenService } from './services/token.service';
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
export class LoginComponent implements OnInit {

    gettingData: boolean = false;
    loginForm: FormGroup;

    constructor(private accountService: AccountService, private router: Router, private globalModelService: GlobalModelService,
        private tokenService: TokenService) {

    }
    ngOnInit(): void {
        this.createForm();
    }

    authenticate() {
        this.gettingData = true;
        this.accountService.login(this.loginForm.value).subscribe({
            next: (response) => {
                this.globalModelService.logedInUser = response.value?.user!
                this.tokenService.setLogedInUserData(response.value!)
                this.globalModelService.initialDataFeteched.next(true);
                this.router.navigate(['/dashboard']);
            },
            error: (error) => {
                this.gettingData = false;
            }
        });

    }
    private createForm() {
        this.loginForm = new FormGroup({
            'userName': new FormControl(null,[Validators.required]),
            'password': new FormControl(null,[Validators.required])
        })
    }
    showUsernameError()
    {
        return !this.loginForm.get('userName')?.valid &&
              (this.loginForm.get('userName')?.dirty || this.loginForm.get('userName')?.touched)
    }
    showPasswordError()
    {
        return !this.loginForm.get('password')?.valid &&
        (this.loginForm.get('password')?.dirty || this.loginForm.get('password')?.touched)
    }
}
