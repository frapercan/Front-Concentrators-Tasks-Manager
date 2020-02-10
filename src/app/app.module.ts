import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AngularMaterialModule } from "./angular-material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { LoginComponent } from "./components/login/login.component";

import { ReactiveFormsModule } from "@angular/forms";

import { HttpClient } from "@angular/common/http";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { NavComponent } from "./components/navigation/nav.component";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { JwtInterceptor, ErrorInterceptor } from "./_helpers";

import {
  StudyListComponent,
  StudyDetailsComponent,
  StudyCommunicationComponent,
  StudyCommunicationOverviewComponent,
  StudyIssuesOverviewComponent,
  StudyIssuesDetailsComponent,
  StudyFormComponent
} from "./components/study";

import {StudyComponent,TargetsComponent,SettingsComponent, IssuesComponent,PerformancesComponent,ReadingComponent,StudyOverviewComponent} from "./components/study/form"

import { ConcentratorListComponent,ConcentratorPreviewComponent } from "./components/concentrator";

import { MatFileUploadModule } from "angular-material-fileupload";

import { from } from "rxjs";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StudyListComponent,
    StudyDetailsComponent,
    StudyCommunicationComponent,
    StudyCommunicationOverviewComponent,
    StudyIssuesOverviewComponent,
    StudyIssuesDetailsComponent,
    StudyFormComponent,
    TargetsComponent,
    IssuesComponent,
    PerformancesComponent,
    ReadingComponent,
    SettingsComponent,
    StudyOverviewComponent,
    StudyComponent,
    ConcentratorListComponent,
    ConcentratorPreviewComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatFileUploadModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
