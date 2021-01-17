import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { GhIssuesSearchItem } from '../models/gh-issues-search-response.model';
import { GhIssuesService } from '../_services/gh-issues.service';
import { of as observableOf, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import marked from 'marked';
import { GhIssueDetailsLabel, GhIssueDetailsResponse } from '../models/gh-issue-details-response.model';

@Component({
  selector: 'app-gh-issues-details',
  templateUrl: './gh-issues-details.component.html',
  styleUrls: ['./gh-issues-details.component.scss']
})
export class GhIssuesDetailsComponent implements OnChanges, OnInit, OnDestroy {
  @Input() searchItem: GhIssuesSearchItem;

  isLoading = false;
  details: GhIssueDetailsResponse;
  body: string;
  labels: GhIssueDetailsLabel[];

  private readonly searchItemChange: Subject<GhIssuesSearchItem> = new Subject<GhIssuesSearchItem>();
  private readonly ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private readonly ghIssuesService: GhIssuesService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.searchItem) {
      this.searchItemChange.next(this.searchItem);
    }
  }

  ngOnInit(): void {
    this.initSearchItemChangeListener();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private initSearchItemChangeListener(): void {
    this.searchItemChange.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.isLoading = true),
      switchMap((searchItem: GhIssuesSearchItem) => {
        return this.ghIssuesService.fetchIssueDetails(searchItem.number);
      }),
      tap(() => this.isLoading = false),
      map((response: GhIssueDetailsResponse) => {
        this.details = response;
        this.body = marked(response.body);
        this.labels = response.labels;
      }),
      catchError(() => {
        this.isLoading = false;
        return observableOf(undefined);
      }),
    ).subscribe();
  }

}
