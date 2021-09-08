import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { FormTextBoxComponent } from "./form-textbox.component";

@NgModule({
  declarations: [
    FormTextBoxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    FormTextBoxComponent
  ]
})
export class FormTextBoxModule { }
