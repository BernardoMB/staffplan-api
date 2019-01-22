import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BASE_URL } from "../global/settings";

@Injectable({
  providedIn: "root"
})
export class AdminServices {
  baseUrl: string = BASE_URL;

  constructor(private httpClient: HttpClient) {}

  getAccessTypeList() {
    return this.httpClient
      .get(this.baseUrl + "getAllAccessType")
      .map(response => response);
  }

  addAccessCombination(postJSON) {
    return this.httpClient
      .post(this.baseUrl + "addAccessCombination", postJSON)
      .map(response => response);
  }

  getRoleList() {
    return this.httpClient
      .get(this.baseUrl + "getAllRole")
      .map(response => response);
  }

  addUser(postJSON) {
    return this.httpClient
      .post(this.baseUrl + "addUser", postJSON)
      .map(response => response);
  }

  bulkAddUserAccess(postJSON) {
    return this.httpClient
      .post(this.baseUrl + "bulkAddUserAccess", postJSON)
      .map(response => response);
  }

  getAllAccessTypeCombination() {
    return this.httpClient
      .get(this.baseUrl + "getAllAccessCombination")
      .map(response => response);
  }

  addRole(postJSON) {
    return this.httpClient
      .post(this.baseUrl + "addRole", postJSON)
      .map(response => response);
  }
  addCustomLabel(postJSON) {
    return this.httpClient
      .post(this.baseUrl + "addCustomLabel", postJSON)
      .map(response => response);
  }
  getFieldList(key) {
    return this.httpClient
      .get(this.baseUrl + "getFieldList/" + key)
      .map(response => response);
  }
  getTableList() {
    return this.httpClient
      .get(this.baseUrl + "getTableList")
      .map(response => response);
  }
}
