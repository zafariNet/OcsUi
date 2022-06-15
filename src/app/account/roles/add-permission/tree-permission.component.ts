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
    <form [formGroup]="permissionForm">
      <h6 href="javascript:void(0)">{{ title }}</h6>
      <ul class="tree" [id]="node!.id" [formArrayName]="'permissionIds'">
        <li>
          <ul>
            <li
              style="width: 100%; white-space: nowrap"
              *ngFor="
                let item of permissionsControllArray.controls;
                let i = index
              "
              [formGroupName]="i"
            >
              <div class="icheck-primary d-inline">
                <input
                  type="checkbox"
                  [id]="(node?.children)![i].id!"
                  [(ngModel)]="(node?.children)![i].isGranted!"
                  formControlName="isGranted"
                  (change)="changePermission($event, (node?.children)![i].id!)"
                />
                <label [for]="(node?.children)![i].id!"
                  >{{ (node?.children)![i].displayName! }}
                </label>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </form>
  `,
})
export class TreePermissionComponent implements AfterViewInit, OnInit {
  permissionForm: FormGroup;
  permissionsControllArray: FormArray;

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.createForm();
  }
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

  private createForm() {
    this.permissionForm = this.formBuilder.group({
      roleId: ['', Validators.required],
      permissionIds: this.formBuilder.array([]),
    });
    this.permissionsControllArray = this.permissionForm.get(
      'permissionIds'
    ) as FormArray;
    this.node?.children?.forEach((response) => {
      this.permissionsControllArray.push(
        this.formBuilder.group({
          id: new FormControl(response.id),
          isGranted: new FormControl(true),
        })
      );
    });
  }
}
