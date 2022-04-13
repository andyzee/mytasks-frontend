import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataService } from '../../data.service';
import { Todo } from '../../model/Todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {

  @Input() project_id!: number;
  @Input() todo!: Todo;
  @Output() todoChange = new EventEmitter<Todo>();

  constructor(private dataService: DataService) { }

  toggleTodo() {
    this.dataService.patchTodo(this.todo, this.project_id).subscribe(todo => {
      this.todo = todo;
    });
  }

}
