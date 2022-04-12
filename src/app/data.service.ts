import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of, tap } from "rxjs";
import { AppSettings } from "./app.settings";
import { Project, Todo } from "./interfaces";


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
      tap((projects: Project[]) => this.log('fetched projects', projects)),
      catchError(this.handleError<Project[]>('getProjects', []))
    )
  }

  createTodo(todo: Todo): Observable<Todo> {
    const url = AppSettings.apiUrl + '/todos'
    return this.http.post<Todo>(url, todo, this.httpOptions).pipe(
      tap((newTodo: Todo) => { this.log('added new todo', todo) }),
      catchError(this.handleError<Todo>('createTodo'))
    )
  }

  patchTodo(todo: Todo, project: Project): Observable<Todo> {
    const url = `${AppSettings.apiUrl}/projects/${project.id}/todos/${todo.id}`;
    return this.http.patch<Todo>(url, todo, this.httpOptions).pipe(
      tap((newTodo: Todo) => { this.log('patched todo', todo) }),
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
