import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { GhIssuesModule } from './gh-issues/gh-issues.module';

@NgModule({
  imports: [
    CoreModule,
    GhIssuesModule // normally we'd import this via router
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
