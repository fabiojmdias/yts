import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SearchResult } from "./model/search-result.model";

const YOUTUBE_API_KEY: string = "XXX_YOUR_KEY_HERE_XXX";
const YOUTUBE_API_URL: string = "https://www.googleapis.com/youtube/v3/search";

@Injectable({
  providedIn: "root"
})
export class YoutubesearchService {
  private apiKey: string;
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiKey = YOUTUBE_API_KEY;
    this.apiUrl = YOUTUBE_API_URL;
  }

  search(query: string): Observable<SearchResult[]> {
    const params: string = [
      `q=${query}`,
      `key=${this.apiKey}`,
      `part=snippet`,
      `type=video`,
      `maxResults=10`
    ].join("&");
    const queryUrl = `${this.apiUrl}?${params}`;
    return this.http.get(queryUrl).pipe(map(response => {
      return <any>response["items"].map(item => {
        // console.log("raw item", item); // debugar o retorno, se necessário
        return new SearchResult({
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnailUrl: item.snippet.thumbnails.high.url
        });
      });
    }));
  }
}
