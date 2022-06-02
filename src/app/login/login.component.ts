import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../service-proxies/service-proxies';
import { GlobalModelService } from './services/global-model.service';
import { LoginService } from './services/login.service';
import { TokenService } from './services/token.service';
@Component({
    selector: 'ocs-login',
    templateUrl: './login.component.html'
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
                this.router.navigate(['/dashboard']);
            },
            error: (error) => {
                this.gettingData = false;
            }
        });

    }
    private createForm() {
        this.loginForm = new FormGroup({
            'userName': new FormControl(null),
            'password': new FormControl(null)
        })
    }
}
