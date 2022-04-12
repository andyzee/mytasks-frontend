import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Project } from '../interfaces';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getProjects()
  }

  getProjects() {
    this.dataService.getProjects().subscribe(
      projects => this.projects = projects
    )
  }

  toggleTodo(isCompleted: boolean) {
    console.log()
  }

}
