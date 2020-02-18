import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ElementRef
} from "@angular/core";
import { SearchResult } from "../model/search-result.model";
import { YoutubesearchService } from "../youtubesearch.service";
import { fromEvent } from "rxjs";
import { map, debounceTime, tap, switchAll } from "rxjs/operators";

@Component({
  selector: "app-search-box",
  // templateUrl: './search-box.component.html',
  // styleUrls: ['./search-box.component.scss']
  template: `
    <input type="text" class="form-control" placeholder="Search" autofocus />
  `
})
export class SearchBoxComponent implements OnInit {
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<SearchResult[]> = new EventEmitter<
    SearchResult[]
  >();

  constructor(private youtube: YoutubesearchService, private el: ElementRef) {}

  ngOnInit(): void {
    const obs = fromEvent(this.el.nativeElement, "keyup")
      .pipe(
        map((e: any) => e.target.value),
        debounceTime(250),
        tap(() => this.loading.emit(true)),
        map((query: string) => this.youtube.search(query)),
        switchAll()
      )
      .subscribe(
        (results: SearchResult[]) => {
          this.loading.emit(false);
          this.results.emit(results);
        },
        (err: any) => {
          console.log(err);
          this.loading.emit(false);
        },
        () => {
          // on completion
          this.loading.emit(false);
        }
      );
  }
}
