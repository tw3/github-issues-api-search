import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { GhIssuesService } from '../_services/gh-issues.service';
import { GhIssuesSearchItem, GhIssuesSearchResponse } from '../models/gh-issues-search-response.model';
import { of as observableOf, Subject } from 'rxjs';

@Component({
  selector: 'app-gh-issues-search',
  templateUrl: './gh-issues-search.component.html',
  styleUrls: ['./gh-issues-search.component.scss']
})
export class GhIssuesSearchComponent implements OnInit, OnDestroy {
  @Output() chosenIssue: EventEmitter<GhIssuesSearchItem> = new EventEmitter<GhIssuesSearchItem>();

  searchForm: FormGroup;
  options: GhIssuesSearchItem[] = [];
  isLoading = false;

  private readonly searchTextChange: Subject<string> = new Subject<string>();
  private readonly MIN_CHARS_FOR_SEARCH = 4;
  private readonly ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly ghIssuesService: GhIssuesService
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  displaySearchOptionFn(searchItem: GhIssuesSearchItem): string {
    return searchItem && searchItem.title ? searchItem.title : '';
  }

  private initForm(): void {
    this.searchForm = this.fb.group({
      userInput: null
    });

    this.initUserInputChangeListener();
    this.initSearchTextChangeListener();
  }

  private initUserInputChangeListener(): void {
    this.searchForm.get('userInput').valueChanges.pipe(
      tap((changeVal: string | GhIssuesSearchItem) => {
        if (typeof changeVal === 'string') {
          const searchText = changeVal as string;
          this.searchTextChange.next(searchText);
          return;
        }
        // Option was selected
        const searchItem = changeVal as GhIssuesSearchItem;
        this.onSelectAutocompleteOption(searchItem);
      }),
      takeUntil(this.ngUnsubscribe)
    ).subscribe();
  }

  private initSearchTextChangeListener(): void {
    this.searchTextChange.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter((searchText: string) => {
        return (searchText.length >= this.MIN_CHARS_FOR_SEARCH);
      }),
      tap(() => this.isLoading = true),
      switchMap((searchText: string) => {
        return this.ghIssuesService.searchIssues(searchText);
      }),
      tap(() => this.isLoading = false),
      map((response: GhIssuesSearchResponse) => {
        this.options = response.items;
      }),
      catchError(() => {
        this.isLoading = false;
        return observableOf(undefined);
      }),
      takeUntil(this.ngUnsubscribe)
    ).subscribe();
  }

  private onSelectAutocompleteOption(item: GhIssuesSearchItem): void {
    this.chosenIssue.emit(item);
  }

}
