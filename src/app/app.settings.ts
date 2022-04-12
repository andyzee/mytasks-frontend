import { isDevMode } from "@angular/core";

export class AppSettings {
  static apiUrl: string = isDevMode() ? 'http://127.0.0.1:3000' : 'https://murmuring-peak-08274.herokuapp.com'
}
