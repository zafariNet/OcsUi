import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ComponentInitilizer } from 'src/app/shared/component-initilizer';

@Component({
  selector: 'ocs-document-form',
  templateUrl: './document-form.component.html',
})
export class DocumentFormComponent implements AfterViewInit, OnInit {
  selectedControl: string;
  documentForm: FormGroup;
  constructor(private componentInitializer: ComponentInitilizer) {}
  ngOnInit(): void {
    this.setForm();
  }
  ngAfterViewInit(): void {
    let that = this;
    this.componentInitializer.setSelect2(
      '#' + this.documentData.id + 'select2',
      {}
    );
    this.componentInitializer.setInputClearable();
    setTimeout(() => {
      $('.form-control,input-group-append').focusin(function (e) {
        // $('.form-control,input-group-append').removeClass(
        //   'selected-form-control'
        // );
        that.selectedControl = e.currentTarget.id;
        // e.currentTarget.classList.add('selected-form-control');
      });
    }, 10);
  }
  @Input('DocumentData') documentData: any;
  setFomrData(data) {
    var currentValue = this.documentForm.controls[this.selectedControl].value;
    this.documentForm.patchValue({
      [this.selectedControl]: currentValue + data,
    });
  }

  setForm() {
    this.documentForm = new FormGroup({
      company: new FormControl(this.documentData.company),
      department: new FormControl(this.documentData.department),
      surname: new FormControl(this.documentData.surname),
      givenNames: new FormControl(this.documentData.givenNames),
      eMail: new FormControl(this.documentData.eMail),
      sender: new FormControl(this.documentData.sender),
      date: new FormControl(this.documentData.date),
      note: new FormControl(this.documentData.note),
      other: new FormControl(),
    });
  }
  clearField(data) {
    debugger;
    this.documentForm.patchValue({
      [data]: '',
    });
    this.selectedControl = data;
  }
}
