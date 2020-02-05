import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnChanges
} from "@angular/core";
import { StudyService } from "../../_services";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { FormControl } from '@angular/forms';


@Component({
  selector: "study-details",
  templateUrl: "study-details.component.html",
  styleUrls: ["./study-details.component.scss"]
})
export class StudyDetailsComponent implements OnInit, OnChanges {
  cycles = {};
  @Output() selected = new FormControl(0);
  id: string;
  loading = false;
  communication: any;
  issues: any;
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
      .then(study => (this.study = study))

    this.studyService.getCicloInfo(this.id).then(cycle => (this.cycles = cycle)).finally(() => this.selected.setValue(Object.keys(this.cycles).length))

    this.studyService
      .getCommunicationResult(this.id)
      .then(communication => (this.communication = communication));

    this.studyService
      .getIssuesResult(this.id)
      .then(issues => (this.issues = issues));
  }

  ngOnChanges() {
    

    if (this.communication) {
      this.getChart.emit(this.communication)
      this.getChart.emit(this.issues)
    }
  }
  refresh() {


    this.studyService.getCicloInfo(this.id).then(cycle => this.cycles = cycle);

    this.studyService
      .getCommunicationResult(this.id)
      .then(communication => (this.communication = communication));

    this.studyService
      .getIssuesResult(this.id)
      .then(issues => (this.issues = issues));
    if (this.communication) {
      this.getChart.emit(this.communication)
      this.getChart.emit(this.issues)
    }
  }

  sortNull() {}

}
