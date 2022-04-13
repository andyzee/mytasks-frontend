// import { isDevMode } from "@angular/core";
import { environment } from "../environments/environment"

export class AppSettings {
  static apiUrl: string = environment.production ? 'https://murmuring-peak-08274.herokuapp.com' : 'http://127.0.0.1:3000'
}
