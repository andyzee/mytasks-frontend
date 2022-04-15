import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { plainToClass } from "class-transformer";
import { catchError, Observable, of, tap, map } from "rxjs";
import { AppSettings } from "./app.settings";
import { Project } from './model/Project';
import { Todo } from './model/Todo';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  }

  log(...param: any): void {
    console.log(...param)
  }

  getProjects(): Observable<Project[]> {
    const url = AppSettings.apiUrl + '/projects'
    return this.http.get<Project[]>(url).pipe(
      map((objects: Object[]) => objects.map(object => plainToClass(Project, object))),
      tap((projects: Project[]) => this.log('fetched projects', projects)),
      catchError(this.handleError<Project[]>('getProjects', []))
    )
  }

  createTodo(todo: Todo): Observable<Todo> {
    const url = AppSettings.apiUrl + '/todos'
    return this.http.post<Todo>(url, todo, this.httpOptions).pipe(
      map((object: Object) => plainToClass(Todo, object)),
      tap((newTodo: Todo) => { this.log('added new todo', newTodo) }),
      catchError(this.handleError<Todo>('createTodo'))
    )
  }

  patchTodo(todo: Todo, project_id: number): Observable<Todo> {
    const url = `${AppSettings.apiUrl}/projects/${project_id}/todos/${todo.id}`;
    const patch_data = {
      isCompleted: todo.isCompleted
    }
    return this.http.patch<Todo>(url, patch_data, this.httpOptions).pipe(
      map((object: Object) => plainToClass(Todo, object)),
      tap((newTodo: Todo) => { this.log('patched todo', newTodo) }),
      catchError(this.handleError<Todo>('patchTodo'))
    )
  }

  private handleError<T>(op = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${op} failed: ${error.message}`);
      return of(result as T);
    };
  }


}
