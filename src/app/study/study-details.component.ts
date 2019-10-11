import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild
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
export class StudyDetailsComponent implements OnInit, AfterViewInit {
  id: string;
  loading = false;
  communicationResult: any;
  issuesResult: any;
  noIssues: Boolean;
  estudio;
  communicationDisplayedColumns;
  issuesDisplayedColumns;
  chartCommunication;
  chartIssues;
  translate: TranslateService;

  constructor(
    private studyService: StudyService,
    private route: ActivatedRoute,
    translate: TranslateService
  ) {
    this.translate = translate;
    this.id = this.route.snapshot.paramMap.get("id");
    this.communicationDisplayedColumns = ["nombre", "cantidad", "porcentaje"];
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
    this.estudio = this.studyService
      .get(this.id)
      .then(result => (this.estudio = result));
  }

  ngAfterViewInit() {
    this.studyService
      .getCommunicationResult(this.id)
      .then(result => (this.communicationResult = result))
      .then(() => this.renderCommunicationChart());

    this.studyService
      .getIssuesResult(this.id)
      .then(issues => (this.issuesResult = issues));
  }

  renderCommunicationChart() {
    if (this.communicationResult.some(element => element.nombre == "Inaccesibles" && element.cantidad > 0)) {
      let data = [];
      this.communicationResult.forEach(element => {
        if (
          !(
            element.nombre == "Pendientes" ||
            element.nombre == "Total" ||
            element.nombre == "Finalizado correctamente"
          )
        ) {
          data.push({
            y:
              Math.round(
                (element.cantidad / this.estudio.total_cerco) * 100 * 100
              ) / 100,
            label: this.translate.instant("result."+element.nombre),
            cantidad: element.cantidad
          });
        }
      });
      this.chartCommunication = new CanvasJS.Chart(
        "chartCommunicationContainer",
        {
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: this.translate.instant("result.analisisComunicaciones")
          },
          subtitles: [
            {
              text: this.translate.instant("result."+"totalAmountAnalyzed") + this.estudio.total_cerco
            }
          ],
          axisY: {
            title: this.translate.instant("result.comunicationGraphicTitle"),
            suffix: "%",
            minimum: 0,
            maximum: Math.max.apply(
              Math,
              data.map(function(o) {
                return o.y;
              })
            )
          },
          data: [
            {
              type: "column",
              toolTipContent: "<b>{y}%</b> <br>{label}: <b>{cantidad}</b>",
              indexLabel: "{cantidad}",
              indexLabelFontColor: "#000000",
              indexLabelPlacement: "auto",
              dataPoints: data
            }
          ]
        }
      );
      this.chartCommunication.render();
    }
  }

  renderIssuesChart() {
    console.log(this.estudio)
    if (this.issuesResult.some(element => element.detectados > 0)) {
      let dataDetected = [];
      this.issuesResult.forEach(element => {
        if (element.detectados > 0) {
          dataDetected.push({
            y:
              ((element.detectados - element.arreglados) /
                this.estudio.total_cerco) *
              100,
            label: element.nombre_incidencia,
            cantidad: element.detectados
          });
        }
      });
      let dataFixed = [];
      this.issuesResult.forEach(element => {
        if (element.detectados > 0) {
          dataFixed.push({
            y: (element.arreglados / this.estudio.total_cerco) * 100,
            label: element.nombre_incidencia,
            cantidad: element.arreglados
          });
        }
      });
      this.chartIssues = new CanvasJS.Chart("chartIssuesContainer", {
        toolTip: {
          shared: true
        },
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: this.translate.instant("result.issuesAnalysis")
        },
        subtitles: [
          {
            text: this.translate.instant("result."+"totalAmountAnalyzed") + this.estudio.total_cerco
          }
        ],
        legend: {
          cursor: "pointer",
          itemclick: function(e) {
            //console.log("legend click: " + e.dataPointIndex);
            //console.log(e);
            if (
              typeof e.dataSeries.visible === "undefined" ||
              e.dataSeries.visible
            ) {
              e.dataSeries.visible = false;
            } else {
              e.dataSeries.visible = true;
            }
            e.chart.render();
          }
        },
        axisY: {
          title: this.translate.instant("result.issues"),
          suffix: "%",
          minimum: 0
        },
        data: [
          {
            type: "stackedColumn",
            toolTipContent: this.translate.instant("issues.detectedLabel")+"<b>{cantidad}</b>",
            indexLabel: "{cantidad}",
            indexLabelFontColor: "#000000",
            indexLabelPlacement: "auto",
            legendText: "Detected",
            showInLegend: true,
            dataPoints: dataDetected
          },
          {
            type: "stackedColumn",
            toolTipContent: "Arreglados: <b>{cantidad}</b>",
            indexLabelFontColor: "#000000",
            legendText: "Fixed",
            showInLegend: true,
            dataPoints: dataFixed
          }
        ]
      });
      this.chartIssues.render();
    } else {
    }
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    if (tabChangeEvent.index == 1 && this.chartIssues == undefined) {
      if (this.issuesResult.some(element => element.detectados)) {
        this.renderIssuesChart();
      } else {
      }
    }
  }
}
