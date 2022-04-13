import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Project } from '../model/Project';
import { MatDialog } from '@angular/material/dialog';
import { CreateTodoDialog } from './todo/create-todo-dialog.component';


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
      data: {projects: this.projects}
    });
  }

  ngOnInit(): void {
    this.getProjects()
  }

  getProjects() {
    this.dataService.getProjects().subscribe(
      projects => this.projects = projects
    )
  }

}
