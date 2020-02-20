import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Issue, } from "../_models";

@Injectable({ providedIn: "root" })
export class IssueService {
  constructor(private http: HttpClient) { }



  getIssuesResult(id) {
    return this.http.get(`${environment.apiUrl}/issues/` + id).toPromise();
  };

  getIssuesResultOverview(id) {
    return this.http.get(`${environment.apiUrl}/issues/` + id+'/overview').toPromise()
  };

  getIssuesGroupList() {
    return this.http.get<any[]>(`${environment.apiUrl}/issues/groups`).toPromise();
  };

  getIssuesList() {
    return this.http.get<Issue[]>(`${environment.apiUrl}/issues`).toPromise();
  };


}
