import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { plainToClass } from "class-transformer";
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
export class CreateTodoDialog {
  todo: Todo = new Todo;
  projectList: Project[] = [];

  constructor(public dialogRef: MatDialogRef<CreateTodoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.projectList = [...data.projects];
      const newCat = plainToClass(Project, {id: -1, title: 'Новая категория'})
      this.projectList.push(newCat);
  }

  submit() {
    
    console.log(this.todo);
  }
}
