import { Component, Inject, OnInit, Output, EventEmitter } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { plainToClass } from "class-transformer";
import { DataService } from "src/app/data.service";
import { Project } from "src/app/model/Project";
import { Todo } from "src/app/model/Todo";

export interface DialogData {
  projects: Project[]
}
@Component({
  selector: 'create-todo-dialog',
  templateUrl: 'create-todo-dialog.html',
  styleUrls: ['create-todo-dialog.scss']
})
export class CreateTodoDialog implements OnInit {

  @Output() todoCreateEvent = new EventEmitter<Todo>();

  projectList: Project[] = [];
  todoForm!: FormGroup;

  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<CreateTodoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public fb: FormBuilder
  ) {
    this.projectList = [...data.projects];
    const newCat = plainToClass(Project, { id: -1, title: 'Новая категория' })
    this.projectList.push(newCat);
  }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.todoForm = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(3)]],
      project_id: ['', [Validators.required]],
      project_title: ['', [requiredIf('project_id', -1)]]
    })
  }

  onSubmit() {
    if (this.todoForm.invalid) return;

    this.dataService.createTodo(this.todoForm.value).subscribe(todo => {
      this.todoCreateEvent.emit(todo);
      this.dialogRef.close();
    });

  }

  isInvalid(prop: string) {
    return this.todoForm.controls[prop]?.invalid
  }
  errorMessage(prop: string) {
    const errors = <any>this.todoForm.controls[prop].errors;
    let messages = [];
    if ('required' in errors)
      messages.push('Необходимо заполнить')
    if ('minlength' in errors)
      messages.push(`Минимальная длина: ${errors['minlength']['requiredLength']}`)

    return messages.join(', ')
  }
}

function requiredIf(prop: string, value: any): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.parent)
      return null

    const propDependentOn = <AbstractControl>control.parent.get(prop);
    return propDependentOn.value == value ? Validators.required(control) : null
  };
}
