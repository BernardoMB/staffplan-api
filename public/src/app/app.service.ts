import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BASE_URL } from "./global/settings";
import "rxjs/add/operator/map";

@Injectable({
  providedIn: "root"
})
export class AppService {
  baseUrl: string = BASE_URL;

  constructor(private httpClient: HttpClient) {}

  getCustomList() {
    return this.httpClient
      .get(this.baseUrl + "getCustomLabel")
      .map(response => response);
  }
}
