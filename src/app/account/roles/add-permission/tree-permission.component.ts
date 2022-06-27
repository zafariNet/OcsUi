import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PermissionCompleteViewModel } from 'src/app/service-proxies/service-proxies';

declare var $: any;
@Component({
  selector: 'ocs-tree-permission',
  template: `
    <form>
      <ul class="tree">
        <li>
          <a>{{ title }}</a>
          <ul>
            <ng-container
              *ngTemplateOutlet="
                recursiveListTmpl;
                context: { list: node.children }
              "
            ></ng-container>
          </ul>
        </li>
      </ul>

      <ng-template #recursiveListTmpl let-list="list">
        <li *ngFor="let item of list">
          <div
            class="icheck-primary d-inline"
            *ngIf="item.children.length == 0"
          >
            <input
              type="checkbox"
              [id]="item.id!"
              [(ngModel)]="item.isGranted"
              [name]="item.name"
              (change)="changePermission($event, item.id!)"
            />
            <label [for]="item.id!">{{ item.displayName! }} </label>
          </div>
          <a *ngIf="item.children.length > 0">{{ item.displayName }}</a>
          <ul *ngIf="item.children.length > 0">
            <ng-container
              *ngTemplateOutlet="
                recursiveListTmpl;
                context: { list: item.children }
              "
            ></ng-container>
          </ul>
        </li>
      </ng-template>
    </form>
  `,
})
export class TreePermissionComponent implements AfterViewInit, OnInit {
  permissionForm: FormGroup;
  permissionsControllArray: FormArray;

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    let tree = $('#' + this.node?.id);
    tree.treed();
    tree.find('.indicator').click();
  }
  @Input('node') node: PermissionCompleteViewModel;
  @Input('title') title: string;
  @Output() permissionChanged: EventEmitter<{
    checked: boolean;
    permissionId: string;
  }> = new EventEmitter<{ checked: boolean; permissionId: string }>();

  changePermission(data, id: string): void {
    let checked = data.target.checked;
    this.permissionChanged.emit({
      checked: checked,
      permissionId: id,
    });
  }
}
