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
  templateUrl: "study-issues.component.html",
  styleUrls: ["study-issues.component.scss"]
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
    this.issuesDisplayedColumns = []
  }

  ngOnInit() { }
  ngOnChanges() {
    this.renderIssuesChart();
    if (this.issues) {
      this.issuesDisplayedColumns = Object.keys(this.issues.detectado)
      this.renderIssuesChart();
    }
  }

  renderIssuesChart() {


    let data = { detected: [], fixed: [] };

    Object.keys(this.issues.detectado).forEach(element => {
      data.detected.push({
        y: Number(this.issues.detectado[element] - this.issues.corregido[element]),
        label: element
      })
      data.fixed.push({
        y: Number(this.issues.corregido[element]),
        label: element
      })






      // if (element.detectado > 0) {
      //   data.detected.push({
      //     y: Number(element.detectado - element.corregido),
      //     label: element.nombre
      //   });
      //   data.fixed.push({
      //     y: Number(element.corregido),
      //     label: element.nombre
      //   });
      // }
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
          legendText: this.translate.instant("issues.remainingLabel"),
          showInLegend: "true",
          dataPoints: data.detected,
          toolTipContent: this.translate.instant("issues.remainingLabel")+": <b>{y}</b>",
          color: "rgba(244,67,54,0.6)"
        },
        {
          type: "stackedColumn",
          legendText: this.translate.instant("issues.detectedLabel"),
          showInLegend: "true",
          toolTipContent: this.translate.instant("issues.detectedLabel")+": <b>{y}</b>",

          dataPoints: data.fixed,
          color: "rgba(76,175,80,0.6)"
        }
      ]
    });
    chart.render();
  }
}
