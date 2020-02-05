import {
  Component,
  OnInit,
  Input
} from "@angular/core";
import * as CanvasJS from "../../../assets/scripts/canvasjs.min";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "issuesOverview",
  templateUrl: "study-issues-overview.component.html",
  styleUrls: ["./study-details.component.scss"]

})
export class StudyIssuesOverviewComponent implements OnInit {

  @Input() issues: any;
  @Input() cycles: any;

  labelToIssuesMap = {}
  data = { detectado: {}, corregido: {} }
  modes = ["detectado", "corregido"]
  chartIssuesOverview;
  translate: TranslateService;

  constructor(translate: TranslateService) {
    this.translate = translate;
  }

  ngOnInit() {

    this.initializeDataWithLabels()
    this.transformData()
    this.renderIssuesOverviewChart()

  }

  initializeDataWithLabels() {

    let labels = this.issues.map(item => {
      item.map(it => {
        if (!Object.keys(this.data).includes(it.nombre)) {
          this.data.detectado[it.nombre] = []
          this.data.corregido[it.nombre] = []
        }
        this.labelToIssuesMap[it.nombre] = it.id_incidencia
      })
    })
  }

  transformData() {
    this.modes.forEach(mode => {
      Object.keys(this.data[mode]).forEach(issue => {
        this.data[mode][issue] = this.mapFilterReduce(this.issues, this.cycles, [this.labelToIssuesMap[issue]], mode)

      })






    })

  }


  mapFilterReduce(origin, cycles, ids, mode) {
    let target = origin.map((cycle) => {
      let filtered = cycle.filter((elem) => { return ids.includes(elem.id_incidencia) })
      if (filtered.length) {
        let amounts = filtered.map(item => item[mode])
        if (amounts) {
          try {
            return { x: new Date(cycles[cycle[0].ciclo].first), y: amounts.reduce((sum, item) => { return sum + item }) }
          }
          catch (e) {

          }
        }
      }

    }).filter(point => { return point != undefined })
    return target
  }


  renderIssuesOverviewChart() {
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
          labelFontSize: 15
        },
        axisY: {
          labelFontSize: 20

        },
        toolTip: {
          shared: true,
          fontSize: 20
        },
        legend: {
          cursor: "pointer",
          itemclick: this.toggleDataSeries,
          fontSize: 20
        },
        data: this.parseDataToGraphics(this.data)
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

  parseDataToGraphics(data) {

    let detect = Object.keys(data.detectado).map(issue => {
      return {
        type: "line",
        name: issue + '[D]',
        showInLegend: true,
        xValueFormatString: "D-MMMM-YYYY HH:mm",
        dataPoints: this.data.detectado[issue],
        markerType: "circle"
      }

    })
    let fix = Object.keys(data.corregido).map(issue => {
      return {
        type: "line",
        name: issue + ['[F]'],
        showInLegend: true,
        xValueFormatString: "D-MMMM-YYYY HH:mm",
        dataPoints: this.data.corregido[issue],
        markerType: "circle"
      }

    })

    return detect.concat(fix)
  };





}
