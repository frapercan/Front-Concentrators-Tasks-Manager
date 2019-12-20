import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Package } from "../_models";

@Injectable({ providedIn: "root" })
export class PackageService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http
      .get<Package[]>(`${environment.apiUrl}/packages`)
      .toPromise();
  }


}
