// import { isDevMode } from "@angular/core";
import { environment } from "../environments/environment"

export class AppSettings {
  static apiUrl: string = environment.production ? 'https://mytasks-042022.herokuapp.com' : 'http://127.0.0.1:3000'
}
