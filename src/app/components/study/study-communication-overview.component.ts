import {
  Component,
  OnInit,
  AfterViewInit,OnChanges,
  Input
} from "@angular/core";
import * as CanvasJS from "../../../assets/scripts/canvasjs.min";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "communicationOverview",
  templateUrl: "study-communication-overview.component.html",
  styleUrls: ["./study-communication-overview.component.scss"]

})
export class StudyCommunicationOverviewComponent implements OnChanges {

  @Input() issues: any;
  @Input() communicationOverview: any;
  @Input() loops: any;
  data = {
    systemManagement: [],
    communicationIssue: [],
    possibleIssue: [],
    total: []

  }

  chartCommunicationOverview;
  translate: TranslateService;

  constructor(translate: TranslateService) {
    this.translate = translate;
  }

  ngOnChanges() {

    this.initializeData()

    this.renderCommunicationOverviewChart()
  

  }

  initializeData() {
    this.communicationOverview.forEach(element => {
      if (this.loops[element.ciclo] != undefined) {
        this.data.systemManagement.push({ x: new Date(this.loops[element.ciclo].first), y: Number(element.gestion_sistemas) })
        this.data.communicationIssue.push({ x: new Date(this.loops[element.ciclo].first), y: Number(element.comunicacion) })
        this.data.possibleIssue.push({ x: new Date(this.loops[element.ciclo].first), y: Number(element.posible_incidencia) })
        this.data.total.push({ x: new Date(this.loops[element.ciclo].first), y: Number(element.total) })
      }
    })
  }


  renderCommunicationOverviewChart() {
    this.chartCommunicationOverview = new CanvasJS.Chart(
      'chartCommunicationOverviewContainer',
      {
        animationEnabled: true,
        zoomEnabled: true,
        theme: "light2",
        title: {
          text: this.translate.instant('result.overviewCommunication'),
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
          shared: true,
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
            name: this.translate.instant('result.communicationIssue'),
            showInLegend: true,
            xValueFormatString: "D-MMMM-YYYY HH:mm",
            dataPoints: this.data.communicationIssue,
            color: "yellow",
            markerType: "circle"

          },
          {
            type: "line",
            name: this.translate.instant('result.possibleIssue'),
            showInLegend: true,
            xValueFormatString: "D-MMMM-YYYY HH:mm",
            dataPoints: this.data.possibleIssue,
            color: "red",
            markerType: "circle"

          },
          {
            type: "line",
            name: this.translate.instant('result.systemManagement'),
            showInLegend: true,
            xValueFormatString: "D-MMMM-YYYY HH:mm",
            dataPoints: this.data.systemManagement,
            color: "green",
            markerType: "circle"

          },
          {
            type: "column",
            name: this.translate.instant('result.totalNotAccesed'),
            color: "blue",
            fillOpacity: .15,
            markerBorderColor: "white",
            markerBorderThickness: 2,
            showInLegend: true,
            xValueFormatString: "D-MMMM-YYYY HH:mm",
            dataPoints: this.data.total,
            lineColor: "blue",
            markerColor: "blue"
          }]
      });
    this.chartCommunicationOverview.render();

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