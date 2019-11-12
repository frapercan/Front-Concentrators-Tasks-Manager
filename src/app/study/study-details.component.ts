import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter,
  OnChanges
} from "@angular/core";
import { first } from "rxjs/operators";
import { User, Study } from "../_models";
import { AuthenticationService, StudyService } from "../_services";
import { CompileShallowModuleMetadata } from "@angular/compiler";
import { ActivatedRoute } from "@angular/router";
import * as CanvasJS from "../../assets/scripts/canvasjs.min";
import { TranslateService } from "@ngx-translate/core";
import { MatTabChangeEvent } from "@angular/material";

@Component({
  selector: "study-details",
  templateUrl: "study-details.component.html"
})
export class StudyDetailsComponent implements OnInit, OnChanges {
  id: string;
  loading = false;
  communication: any;
  issues: any;
  noIssues: Boolean;
  study;
  translate: TranslateService;
  @Output() getChart = new EventEmitter<any>();

  constructor(
    private studyService: StudyService,
    private route: ActivatedRoute,
    translate: TranslateService
  ) {
    this.translate = translate;
    this.id = this.route.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    this.study = this.studyService
      .get(this.id)
      .then(study => (this.study = study));

    this.studyService
      .getCommunicationResult(this.id)
      .then(communication => (this.communication = communication,
        console.log(this.communication)));

    this.studyService
      .getIssuesResult(this.id)
      .then(issues => (this.issues = issues));
  }

  ngOnChanges() {
    if (this.communication){
      this.getChart.emit(this.communication)
    }
  }
}
