import {
  Component,
  OnInit,
  Input,
  OnChanges,
} from "@angular/core";

import * as CanvasJS from "../../../assets/scripts/canvasjs.min";
import { TranslateService } from "@ngx-translate/core";


@Component({
  selector: "issues",
  templateUrl: "study-issues.component.html"
})
export class StudyIssuesDetailsComponent implements OnInit, OnChanges {
  @Input() issues: any;
  @Input() study;
  issuesDisplayedColumns;
  chartIssues;
  translate: TranslateService;

  constructor(
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
  }

  ngOnInit() {}
  ngOnChanges() {
    if (this.issues) {
      if (this.issues.some(element => element.detectado > 0)) {
        this.renderIssuesChart();
      } else {
        var chart = new CanvasJS.Chart("chartIssuesContainer", {});
        chart.render();
      }
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
          color: "rgba(244,67,54,0.6)"
        },
        {
          type: "stackedColumn",
          legendText: "Repaired",
          showInLegend: "true",
          toolTipContent: "Repaired: <b>{y}</b>",
          dataPoints: data.fixed,
          color: "rgba(76,175,80,0.6)"
        }
      ]
    });
    chart.render();
  }
}
