import { NgModule } from '@angular/core';
import { GhIssuesSearchComponent } from './gh-issues-search/gh-issues-search.component';
import { SharedModule } from '../shared/shared.module';
import { GhIssuesService } from './_services/gh-issues.service';
import { GhIssuesPageComponent } from './gh-issues-page/gh-issues-page.component';
import { GhIssuesDetailsComponent } from './gh-issues-details/gh-issues-details.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    GhIssuesPageComponent,
    GhIssuesSearchComponent,
    GhIssuesDetailsComponent,
  ],
  exports: [
    GhIssuesPageComponent
  ],
  providers: [
    GhIssuesService
  ]
})
export class GhIssuesModule {
}
