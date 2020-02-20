import {
  Component,
  OnChanges,
  Input
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import * as CanvasJS from "../../../assets/scripts/canvasjs.min";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "communication",
  templateUrl: "study-communication.component.html",
  styleUrls: ["study-communication.component.scss"]
})
export class StudyCommunicationComponent implements OnChanges {
  id: string;
  loading = false;
  @Input() communication: any;
  @Input() study: any;
  communicationDisplayedColumns = [];
  chartCommunication;
  translate: TranslateService;
  colormap
  constructor(private route: ActivatedRoute, translate: TranslateService, ) {
    this.translate = translate;
    this.id = this.route.snapshot.paramMap.get("id");
    this.colormap = { 'Finalizado correctamente': "#86f8a6", 'no accedido': "#f88e86", 'pendiente': "#f8c786", 'total':"#9586f8"}

    


  }

  ngOnChanges() {
    if (this.communication) {
      this.communicationDisplayedColumns = Object.keys(this.communication)

      this.renderCommunicationChart();
    }
  }

  renderCommunicationChart() {
    let data = [];
    Object.keys(this.communication).forEach(element => {
      let percentage = this.communication[element] / this.communication['total'] * 100;
      let color = Object.keys(this.colormap).includes(element)  ? this.colormap[element]  : 'gray'
      data.push({
        y: Number(percentage.toFixed(3)),
        label: this.translate.instant("result." + element),
        amount: this.communication[element],
        color: color
      });

    });

    this.chartCommunication = new CanvasJS.Chart(
      'chartCommunicationContainer',
      {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: this.translate.instant("result.analisisComunicaciones"),
          fontSize: 30

        },
        subtitles: [
          {
            text:
              this.translate.instant("result." + "totalAmountAnalyzed") +
              this.study.total,
            fontSize: 20
          }
        ], axisX: {
          labelFontSize: 20
        },
        axisY: {
          title: this.translate.instant("result.comunicationGraphicTitle"),
          labelFontSize: 20,
          suffix: "%",
          minimum: 0,
          maximum: Math.max.apply(
            Math,
            data.map(function (o) {
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
            dataPoints: data,
            color: "rgba(244,67,54,0.6)"
          }
        ]
      }
    );
    this.chartCommunication.render();
  }

  
}


