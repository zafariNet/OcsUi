import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ComponentInitilizer } from 'src/app/shared/component-initilizer';
import { ClickPostService } from './top-buttons/click-post.service';
declare var $: any;

@Component({
  selector: 'ocs-click-post',
  templateUrl: './click-post.component.html',
})
export class ClickPostComponent implements AfterViewInit, OnInit {
  documentData: any[];
  constructor(
    private componentInitilizer: ComponentInitilizer,
    private clickPostService: ClickPostService
  ) {}
  ngOnInit(): void {
    this.clickPostService
      .getDocumentData()
      .subscribe((sampleData) => (this.documentData = sampleData));
  }
  ngAfterViewInit(): void {}
}
