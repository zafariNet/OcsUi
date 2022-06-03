import { Component, OnInit } from '@angular/core';
import { defaultTo } from 'lodash';
import { AccountService } from 'src/app/service-proxies/service-proxies';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  constructor(private accountService : AccountService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.accountService.index().subscribe(response=>
        {
        })  
    }, 2000);
    
  }

}
