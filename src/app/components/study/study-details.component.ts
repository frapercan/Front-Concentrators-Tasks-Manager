import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnChanges
} from "@angular/core";
import { StudyService, IssueService, PerformanceService } from "../../_services";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { FormControl } from '@angular/forms';


@Component({
  selector: "study-details",
  templateUrl: "study-details.component.html",
  styleUrls: ["./study-details.component.scss"]
})
export class StudyDetailsComponent implements OnInit, OnChanges {
  id: string;
  communication: any;
  communicationOverview: any;
  issues: any;
  issuesOverview:any;
  performances: any;
  loops = {};
  loopsKeys = []
  study;
  translate: TranslateService;
  loopsExplorer: Boolean;
  @Output() selected = new FormControl(0);
  @Output() getChart = new EventEmitter<any>();

  constructor(
    private studyService: StudyService,
    private issueService: IssueService,
    private performanceService: PerformanceService,
    private route: ActivatedRoute,
    translate: TranslateService
  ) {
    this.translate = translate;
    this.id = this.route.snapshot.paramMap.get("id");
    this.loopsExplorer = false;
  }

  ngOnInit() {
    this.study = this.studyService
      .get(this.id)
      .then(study => (this.study = study))

    this.studyService.getLoopsInfo(this.id).then(cycle => (this.loops = cycle)).finally(() => { this.loopsKeys = Object.keys(this.loops); this.selected.setValue(Object.keys(this.loops).length-1) })

    this.studyService
      .getCommunicationResult(this.id)
      .then(communication => (this.communication = communication));

    this.studyService
      .getCommunicationResultOverview(this.id)
      .then(communicationOverview => (this.communicationOverview = communicationOverview));

    this.issueService
      .getIssuesResult(this.id)
      .then(issues => (this.issues = issues));

      this.issueService
      .getIssuesResultOverview(this.id)
      .then(issuesOverview => (this.issuesOverview = issuesOverview));

    this.performanceService
      .getPerformancesResult(this.id)
      .then(performances => (this.performances = performances));
  }

  ngOnChanges() {

    


    if (this.communication) {
      this.getChart.emit(this.communication)
      this.getChart.emit(this.issues)
    }
  }

  ngOnDestroy() {



  }
  refresh() {
    this.studyService.getLoopsInfo(this.id).then(cycle => this.loops = cycle);

    this.studyService
      .getCommunicationResult(this.id)
      .then(communication => (this.communication = communication));

    this.issueService
      .getIssuesResult(this.id)
      .then(issues => (this.issues = issues));
    if (this.communication) {
      this.getChart.emit(this.communication)
      this.getChart.emit(this.issues)
    }
  }

  keepOrder = (a, b) => {
    return b;
  }
}

