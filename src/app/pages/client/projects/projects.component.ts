import { Component, OnInit } from '@angular/core';
import { Project } from '../../../models';
import { ProjectService } from '../../../utils/services';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor(
    private _projectService: ProjectService
  ) { }
  projects: Project[];

  async ngOnInit() {
    try {
      this.projects = <Array<Project>>await this._projectService.listAsync();
    } catch (error) {
      this._projectService.errorNotification(error);
    }
  }

}
