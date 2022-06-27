import { Component, Input, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
declare var $: any;
@Component({
  selector: 'ocs-document-tree',
  templateUrl: './document-tree.component.html',
})
export class DocumentTreeComponent implements OnInit {
  ngOnInit(): void {}
  @Input('treeData') treeData: any;
  @Input('connectedTo') connectedTo: any[] = [];
  doDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
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

  showIcons(id: any) {
    $('.document-action-button').animate({ opacity: 0 }, { queue: false });
    $("[attribute|='" + id + "']").animate({ backgroundColor: '#e7f4f9' });
    $('#' + id).animate({ opacity: 1 }), { queue: false };
  }
}
