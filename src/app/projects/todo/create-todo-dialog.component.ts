import { Component, Inject, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { plainToClass } from "class-transformer";
import { DataService } from "src/app/data.service";
import { Project } from "src/app/model/Project";
import { Todo } from "src/app/model/Todo";
import { CTCreateFormGroup } from "src/app/util/helpers";

export interface DialogData {
  projects: Project[]
}
@Component({
  selector: 'create-todo-dialog',
  templateUrl: 'create-todo-dialog.html',
  styleUrls: ['create-todo-dialog.scss']
})
export class CreateTodoDialog implements OnInit {

  @Output() projectsUpdateEvent = new EventEmitter<Project[]>();

  todo: Todo = new Todo;
  projectList: Project[] = [];
  todoForm!: FormGroup;

  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<CreateTodoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.projectList = [...data.projects];
    const newCat = plainToClass(Project, { id: -1, title: 'Новая категория' })
    this.projectList.push(newCat);
  }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.todoForm = CTCreateFormGroup(this.todo);
  }

  onSubmit() {
    if (this.todoForm.invalid) return;

    this.dataService.createTodo(this.todoForm.value).subscribe(projects => {
      this.projectsUpdateEvent.emit(projects);
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
