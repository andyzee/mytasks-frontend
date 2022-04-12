import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Project, Todo } from '../interfaces';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];

  @Input() input_checked: boolean = true;
  @Input() input_todo!: Todo;
  @Input() input_project!: Project;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getProjects()
  }

  getProjects() {
    this.dataService.getProjects().subscribe(
      projects => this.projects = projects
    )
  }

  toggleTodo() {
    console.log(this.input_checked, this.input_project, this.input_todo)
  }

}
