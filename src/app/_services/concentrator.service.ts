import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Concentrator } from "../_models";

@Injectable({ providedIn: "root" })
export class ConcentratorService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http
      .get<Concentrator[]>(`${environment.apiUrl}/concentrators`)
      .toPromise();
  }
}
