import {
  Component,
  OnChanges,
  Input
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import * as CanvasJS from "../../../assets/scripts/canvasjs.min";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "performances",
  templateUrl: "study-performances.component.html",
  styleUrls: ["study-performances.component.scss"]
})
export class StudyPerformancesComponent implements OnChanges {
  id: string;
  loading = false;
  @Input() performances: any;
  @Input() study: any;
  performancesDisplayedColumns = [];
  chartPerformances;
  translate: TranslateService;
  colormap
  constructor(private route: ActivatedRoute, translate: TranslateService, ) {
    this.translate = translate;
    this.id = this.route.snapshot.paramMap.get("id");





  }



  ngOnChanges() {
    if (this.performances) {
      this.performancesDisplayedColumns = Object.keys(this.performances)
      this.renderIssuesChart()


    }
  }



  renderIssuesChart() {


    let data = { success: [], unsuccess: [] };

    Object.keys(this.performances).forEach(element => {
      data.success.push({
        y: Number(this.performances[element]['Actuación completada']),
        label: element
      })
      data.unsuccess.push({
        y: Number(this.performances[element]['Actuación fallida']),
        label: element
      })



    });

    var chart = new CanvasJS.Chart("chartPerformancesContainer", {
      title: {
        text: this.translate.instant("result.performancesAnalysis") 
      },
      animationEnabled: true,
      axisY: {
        title: this.translate.instant("result.amountCerco"),
        logarithmic: false
      },
      subtitles: [
        {
          text:
            this.translate.instant("result." + "totalAmountAnalyzed") + this.study.total
        }
      ],
      toolTip: {
        shared: true
      },
      data: [
        {
          type: "stackedColumn",
          legendText: this.translate.instant("result." + "successful"),
          showInLegend: "true",
          dataPoints: data.success,
          toolTipContent: this.translate.instant("result." + "successful")+": <b>{y}</b>",
          color: "rgba(76,175,80,0.6)"

        },
        {
          type: "stackedColumn",
          legendText: this.translate.instant("result." + "unsuccessful"),
          showInLegend: "true",
          toolTipContent: this.translate.instant("result." + "unsuccessful")+": <b>{y}</b>",
          dataPoints: data.unsuccess,
          color: "rgba(244,67,54,0.6)"

        }
      ]
    });
    chart.render();
  }




}


