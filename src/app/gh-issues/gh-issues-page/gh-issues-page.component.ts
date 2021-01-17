import { Component, OnInit } from '@angular/core';
import { GhIssuesSearchItem } from '../models/gh-issues-search-response.model';

@Component({
  selector: 'app-gh-issues-page',
  templateUrl: './gh-issues-page.component.html',
  styleUrls: ['./gh-issues-page.component.scss']
})
export class GhIssuesPageComponent implements OnInit {
  issue: GhIssuesSearchItem;

  constructor() {
  }

  ngOnInit(): void {
  }

  onChosenIssue(item: GhIssuesSearchItem): void {
    this.issue = item;
  }

}
