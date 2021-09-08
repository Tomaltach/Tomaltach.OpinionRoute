import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "opro-form-textbox",
  templateUrl: "./form-textbox.component.html",
  styleUrls: ["./form-textbox.component.css"]
})
export class FormTextBoxComponent implements OnInit {

  value: string;

  labelValue: string;
  @Input()
  set setLabelValue(labelValue: string) {
    this.labelValue = labelValue;
  }
  @Output()
  childEvent = new EventEmitter<string>();

  constructor(public formBuilder: FormBuilder) { }

  async ngOnInit(): Promise<void> { }

  onChange(value: string) {
    this.childEvent.emit(value);
  }
}
