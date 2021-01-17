import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GhIssuesQueryBuilder, GhIssuesQueryBuilderIssuesState } from '../_helpers/gh-issues-query-builder';
import { Observable } from 'rxjs';
import { GhIssuesSearchResponse } from '../models/gh-issues-search-response.model';
import { GhIssueDetailsResponse } from '../models/gh-issue-details-response.model';

@Injectable()
export class GhIssuesService {
  // These values could be pulled from outside this file if needed
  private readonly BASE_URL = 'https://api.github.com';
  private readonly REPO_OWNER = 'facebook';
  private readonly REPO_NAME = 'react';

  constructor(
    private readonly httpClient: HttpClient
  ) {
  }

  searchIssues(text: string, state = GhIssuesQueryBuilderIssuesState.OPEN): Observable<GhIssuesSearchResponse> {
    const url = `${this.BASE_URL}/search/issues`;
    const queryBuilder: GhIssuesQueryBuilder = this.getDefaultQueryBuilder();
    queryBuilder.setState(state);
    queryBuilder.setText(text);
    const query = queryBuilder.build(); // e.g. 'repo:facebook/react type:issue state:open foobar';
    const params = {q: query};
    return this.httpClient.get<GhIssuesSearchResponse>(url, {params});
  }

  fetchIssueDetails(issueNumber: number): Observable<GhIssueDetailsResponse> {
    const url = `${this.BASE_URL}/repos/${this.REPO_OWNER}/${this.REPO_NAME}/issues/${issueNumber}`;
    return this.httpClient.get<GhIssueDetailsResponse>(url);
  }

  private getDefaultQueryBuilder(): GhIssuesQueryBuilder {
    const queryBuilder: GhIssuesQueryBuilder = new GhIssuesQueryBuilder();
    queryBuilder.setRepo({user: this.REPO_OWNER, repo: this.REPO_NAME});
    return queryBuilder;
  }


}
