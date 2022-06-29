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

  showIcons(id: any) {
    $('.document-action-button').animate({ opacity: 0 }, { queue: false });
    $("[attribute|='" + id + "']").animate({ backgroundColor: '#e7f4f9' });
    $('#' + id).animate({ opacity: 1 }), { queue: false };
  }
}
