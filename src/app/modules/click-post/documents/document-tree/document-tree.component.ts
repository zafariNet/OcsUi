import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { AppBaseComponent } from 'src/app/app-base.component';

declare var $: any;
@Component({
  selector: 'ocs-document-tree',
  templateUrl: './document-tree.component.html',
})
export class DocumentTreeComponent extends AppBaseComponent implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }
  ngOnInit(): void {}
  @Input('treeData') treeData: any;
  @Input('connectedTo') connectedTo: any[] = [];
  @Output('currentDocumentChanged')
  currentDocumentChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output('documentSplitted') documentSplitted: EventEmitter<any> =
    new EventEmitter<any>();
  currentDocumentId: string;
  doDrop(event: CdkDragDrop<string[]>) {
    debugger;
    if (event.previousContainer === event.container) {
      var xxx = event.previousContainer.data[event.previousIndex]['id'];
      var yyy = event.previousContainer.data[event.currentIndex]['id'];
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  changeCurrentDocument(document: any) {
    this.currentDocumentId = document.id;
    setTimeout(() => {
      $('.document-action-button').animate({ opacity: 0 }, { queue: false });
      $("[attribute|='" + document.id + "']").animate({
        backgroundColor: '#e7f4f9',
      });
      $('#thumbnail' + document.id).animate({ opacity: 1 }), { queue: false };
      $('[id^=node]').removeClass('selected-tree-node');
      $('#node' + document.id).addClass('selected-tree-node');

      this.currentDocumentChanged.emit(document);
    }, 1);
  }

  moveUp(order) {
    if (order == 0) {
      this.notificationService.showSimpleError(
        this.l('CAN_NOT_MOVE_FURTHER'),
        this.l('CAN_NOT_MOVE_FURTHER_DETAIL')
      );
      return;
    }
    this.documentMove(order, order - 1);
  }
  moveDown(order) {
    debugger;
    if (order == this.treeData.images.length - 1) {
      this.notificationService.showSimpleError(
        this.l('CAN_NOT_MOVE_FURTHER'),
        this.l('CAN_NOT_MOVE_FURTHER_DETAIL')
      );
      return;
    }
    this.documentMove(order, order + 1);
  }
  private documentMove(old_index, new_index) {
    this.treeData.images;
    if (new_index >= this.treeData.images.length) {
      var k = new_index - this.treeData.images.length + 1;
      while (k--) {
        this.treeData.images.push(undefined);
      }
    }
    this.treeData.images.splice(
      new_index,
      0,
      this.treeData.images.splice(old_index, 1)[0]
    );
  }
  splitDocument(document) {
    debugger;
    this.documentSplitted.emit({
      documentId: this.treeData.id,
      page: document,
    });
  }
}
