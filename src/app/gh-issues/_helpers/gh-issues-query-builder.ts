export class GhIssuesQueryBuilder {
  private repoData: GhIssuesQueryBuilderRepoData;
  private issuesState: GhIssuesQueryBuilderIssuesState;
  private text: string;

  constructor() {
  }

  setRepo(repoData: GhIssuesQueryBuilderRepoData): GhIssuesQueryBuilder {
    this.repoData = repoData;
    return this;
  }

  setState(issuesState: GhIssuesQueryBuilderIssuesState): GhIssuesQueryBuilder {
    this.issuesState = issuesState;
    return this;
  }

  setText(text: string): GhIssuesQueryBuilder {
    this.text = text;
    return this;
  }

  build(): string {
    const qualifiers: string[] = [];
    qualifiers.push('type:issue');

    if (this.repoData) {
      qualifiers.push(`repo:${this.repoData.user}/${this.repoData.repo}`); // e.g. 'repo:facebook/react'
    }
    if (this.issuesState) {
      qualifiers.push(`state:${this.issuesState}`); // e.g. 'state:open'
    }
    if (this.text) {
      qualifiers.push(this.text);
    }

    const result = qualifiers.join(' ');
    return result;
  }

}

export interface GhIssuesQueryBuilderRepoData {
  user: string;
  repo: string;
}

export enum GhIssuesQueryBuilderIssuesState {
  OPEN = 'open',
  CLOSED = 'closed'
}
