import { Type } from "class-transformer";
import { Project } from "./Project";

export class Todo {
  id: number = 0;
  text: string = '';
  isCompleted: boolean = false;
  project_id?: number;

  @Type(() => Project)
  project?: Project;
}
