import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Project } from '../model/Project';
import { MatDialog } from '@angular/material/dialog';
import { CreateTodoDialog } from './todo/create-todo-dialog.component';
import { Todo } from '../model/Todo';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];

  constructor(private dataService: DataService, public dialog: MatDialog) { }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateTodoDialog, {
      width: '300px',
      data: { projects: this.projects }
    });

    dialogRef.componentInstance.todoCreateEvent.subscribe(todo => this.handleCreateTodoEvent(todo))
  }

  ngOnInit(): void {
    this.getProjects()
  }

  getProjects() {
    this.dataService.getProjects().subscribe(
      projects => this.projects = projects
    )
  }

  todoTrackFn(index: number, item: Todo) {
    return item.id
  }

  handleCreateTodoEvent(todo: Todo) {
    if (!todo.project) {
      throw TypeError('todo.project is undefined')
    }

    let isNewProject = true;
    for (let i = 0; i < this.projects.length; i++) {
      if (this.projects[i].id === todo.project.id) {
        isNewProject = false;
        delete todo.project;
        this.projects[i].todos.push(todo);
        return;
      }
    }

    if (isNewProject) {
      const { project } = todo;
      delete todo.project;
      project.todos.push(todo);
      this.projects.push(project);
    }
  }

}
