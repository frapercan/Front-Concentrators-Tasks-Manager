import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Input,
  OnChanges,
  AfterContentInit,
  AfterViewChecked
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
  selector: "issues",
  templateUrl: "study-issues.component.html"
})
export class StudyIssuesDetailsComponent implements OnInit,OnChanges {
  @Input() issues: any;
  noIssues: Boolean;
  @Input() study;
  issuesDisplayedColumns;
  chartIssues;
  translate: TranslateService;

  constructor(
    private studyService: StudyService,
    private route: ActivatedRoute,
    translate: TranslateService
  ) {
    this.translate = translate;
    this.issuesDisplayedColumns = [
      "nombre_incidencia",
      "detectados",
      "porcentaje_detectados",
      "corregidos",
      "porcentaje_arreglados"
    ];
    this.noIssues = false;
  }

  ngOnInit() {
    console.log(this.issues)

  }
  ngOnChanges() {
    if (this.issues.some(element => element.detectado > 0)) {
      this.renderIssuesChart();
    }
    else {
      var chart = new CanvasJS.Chart("chartIssuesContainer", {})
      chart.render()
      
    }
  }

  renderIssuesChart() {
    let data = { detected: [], fixed: [] };
    this.issues.forEach(element => {
      if (element.detectado > 0) {
        data.detected.push({
          y: Number(element.detectado - element.corregido),
          label: element.nombre
        });
        data.fixed.push({
          y: Number(element.corregido),
          label: element.nombre
        });
      }
    });
    var chart = new CanvasJS.Chart("chartIssuesContainer", {
      title: {
        text: this.translate.instant("result.issuesAnalysis")
      },
      animationEnabled: true,
      axisY: {
        title: this.translate.instant("result.amountCerco"),
        logarithmic: false
      },
      subtitles: [
        {
          text:
            this.translate.instant("result." + "totalAmountAnalyzed") +
            this.study.total
        }
      ],
      toolTip: {
        shared: true
      },
      data: [
        {
          type: "stackedColumn",
          legendText: "Detected",
          showInLegend: "true",
          dataPoints: data.detected,
          toolTipContent: "Remaining: <b>{y}</b>",
          color: "red"
        },
        {
          type: "stackedColumn",
          legendText: "Repaired",
          showInLegend: "true",
          toolTipContent: "Repaired: <b>{y}</b>",
          dataPoints: data.fixed,
          color: "green"
        }
      ]
    });
    console.log(data);
    chart.render();
  }
}
