import {
  Component,
  OnInit,
  AfterViewInit,
  OnChanges,
  Input
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import * as CanvasJS from "../../assets/scripts/canvasjs.min";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "communication",
  templateUrl: "study-communication.component.html"
})
export class StudyCommunicationComponent implements OnChanges {
  id: string;
  loading = false;
  @Input() communication: any;
  @Input() study: any;
  @Input() index;
  ciclo: String

  communicationDisplayedColumns;
  chartCommunication;
  translate: TranslateService;

  constructor(private route: ActivatedRoute, translate: TranslateService) {
    this.translate = translate;
    this.id = this.route.snapshot.paramMap.get("id");
    this.communicationDisplayedColumns = ["name", "amount", "percentage"];
  }

  ngOnChanges() {
    if (this.communication) {
      this.renderCommunicationChart();
    }
  }

  renderCommunicationChart() {
    if (
      this.communication.some(
        element =>
          element.name == "Finalizado correctamente" && element.amount > 0
      )
    ) {
      let data = [];
      this.communication.forEach(element => {
        if (
          !(
            element.name == "Pendientes" ||
            element.name == "total" ||
            element.name == "Finalizado correctamente" ||
            element.name == "Inaccesibles" ||
            element.amount == null
          )
        ) {
          data.push({
            y:
              Math.round((element.amount / this.study.total) * 100 * 100) / 100,
            label: this.translate.instant("result." + element.name),
            amount: element.amount
          });
        }
      });
      this.chartCommunication = new CanvasJS.Chart(
        'chartCommunicationContainer',
        {
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: this.translate.instant("result.analisisComunicaciones")
          },
          subtitles: [
            {
              text:
                this.translate.instant("result." + "totalAmountAnalyzed") +
                this.study.total
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
              toolTipContent: "<b>{y}%</b> <br>{label}: <b>{amount}</b>",
              indexLabel: "{amount}",
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
}
