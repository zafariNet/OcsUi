import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  NgbOffcanvas,
  OffcanvasDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { ComponentInitilizer } from 'src/app/shared/component-initilizer';
import { ClickPostService } from './top-buttons/click-post.service';
declare var $: any;

@Component({
  selector: 'ocs-click-post',
  templateUrl: './click-post.component.html',
})
export class ClickPostComponent implements AfterViewInit, OnInit {
  documentData: any[];
  @ViewChild('content') content;
  constructor(
    private componentInitilizer: ComponentInitilizer,
    private clickPostService: ClickPostService,
    private offcanvasService: NgbOffcanvas
  ) {}
  ngOnInit(): void {
    this.clickPostService
      .getDocumentData()
      .subscribe((sampleData) => (this.documentData = sampleData));
  }
  ngAfterViewInit(): void {
    // $(function () {
    //   $('#viewPort').css({ height: $(document).height() - 140 + 'px' });
    //   $('.extend-table-minimize-content').css({
    //     height: $(document).height() - 140 + 'px',
    //   });
    //   $(window).resize(function () {
    //     $('#viewPort').css({ height: $(document).height() - 140 + 'px' });
    //     $('.extend-table-minimize-content').css({
    //       height: $(document).height() - 140 + 'px',
    //     });
    //   });
    // });
  }

  showSearchDialog() {
    this.offcanvasService.open(this.content, { position: 'top' });
  }
  private getDismissReason(reason: any): string {
    if (reason === OffcanvasDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === OffcanvasDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on the backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
