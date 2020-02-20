import {
  Component,
  OnInit,
  Input,
  OnChanges
} from "@angular/core";
import * as CanvasJS from "../../../assets/scripts/canvasjs.min";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "issuesOverview",
  templateUrl: "study-issues-overview.component.html"

})
export class StudyIssuesOverviewComponent implements OnChanges {

  @Input() issues: any;
  @Input() issuesOverview: any;
  @Input() loops: any;

  data = { detectado: [], corregido: [] }

  chartIssuesOverview;

  translate: TranslateService;

  constructor(translate: TranslateService) {
    this.translate = translate;
  }

  ngOnInit() {


  }
  ngOnChanges() {
    this.initializeData()
    this.renderCommunicationOverviewChart()

  }

  initializeData() {
    if (!this.data.detectado.length && !this.data.corregido.length) {
      Object.keys(this.issuesOverview).forEach(loop => {
        
        const date = CanvasJS.formatDate(this.loops[loop].first, "D-MMM-YY hh:mm")
        
        let contentCorregido = date+"<br>" +"<b><span style='color:green;'>Total:</span></b>"+this.issuesOverview[loop].corregido + "<br>" + Object.keys(this.issues[loop].corregido).map(issueKey => {
          return "<span style='color:green;'>"+issueKey+":</span>"  + this.issues[loop].corregido[issueKey] + '<br>'
        }
        )
        let contentDetectado = date+"<br>" +"<b><span style='color:red;'>Total:</span></b>"+this.issuesOverview[loop].detectado + "<br>" + Object.keys(this.issues[loop].detectado).map(issueKey => {
          return "<span style='color:red;'>"+issueKey+":</span>"  + this.issues[loop].detectado[issueKey] + '<br>'
        }
        )
        this.data.detectado.push({ x: new Date(this.loops[loop].first), y: Number(this.issuesOverview[loop].detectado), toolTipContent: contentDetectado.toString().replace(/,/g, '') })
        this.data.corregido.push({ x: new Date(this.loops[loop].first), y: Number(this.issuesOverview[loop].corregido), toolTipContent: contentCorregido.toString().replace(/,/g, '') })
      })
    }
  }


  renderCommunicationOverviewChart() {
    this.chartIssuesOverview = new CanvasJS.Chart(
      'chartIssuesOverviewContainer',
      {
        animationEnabled: true,
        zoomEnabled: true,
        theme: "light2",
        title: {
          text: this.translate.instant('result.overviewIssues'),
          fontSize: 30
        },
        axisX: {
          interval: 5,
          intervalType: "day",
          labelFontSize: 12
        },
        axisY: {
          labelFontSize: 12

        },
        toolTip: {
          shared: false,
          fontSize: 18
        },
        legend: {
          cursor: "pointer",
          itemclick: this.toggleDataSeries,
          fontSize: 14
        },
        data: [
          {
            type: "line",
            name: this.translate.instant('issues.detected'),
            showInLegend: true,
            xValueFormatString: "D-MMMM-YYYY HH:mm",
            dataPoints: this.data.detectado,
            color: "red",
            markerType: "circle"

          },
          {
            type: "line",
            name: this.translate.instant('issues.fixed'),
            showInLegend: true,
            xValueFormatString: "D-MMMM-YYYY HH:mm",
            dataPoints: this.data.corregido,
            color: "green",
            markerType: "circle"

          }
        ]
      });
    this.chartIssuesOverview.render();

  }

  addSymbols(e) {
    var suffixes = ["", "K", "M", "B"];
    var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);

    if (order > suffixes.length - 1)
      order = suffixes.length - 1;

    var suffix = suffixes[order];
    return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
  }

  toggleDataSeries(e) {
    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    e.chart.render();
  }








}

