import {
  Component,
  OnInit,
  Input
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import * as CanvasJS from "../../assets/scripts/canvasjs.min";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "communicationOverview",
  templateUrl: "study-communication-overview.component.html"
})
export class StudyCommunicationOverviewComponent implements OnInit {

  @Input() communication: any;
  @Input() cycles: any;
  data = {
    systemManagement: [],
    communicationIssue: [],
    possibleIssue: [],
    total: []

  }


  communicationDisplayedColumns;
  chartCommunicationOverview;
  translate: TranslateService;

  constructor(translate: TranslateService) {
    this.translate = translate;
  }

  ngOnInit() {
    this.transform_data()
    this.renderCommunicationOverviewChart()

  }

  transform_data() {
    this.data.systemManagement = this.communication.map((cycleResults) => {
      let filtered = cycleResults.filter((elem) => { return elem.id_resultado == 7 || elem.id_resultado == 4 })
      if (filtered.length) {
        let amounts = filtered.map(item => item.amount)
        if (amounts){
          try{
        return { x: new Date(this.cycles[0][cycleResults[0].ciclo - 1].first), y: amounts.reduce((sum, item) => { return sum + item }) }}
        catch(e){
          
        }
      }
      }

    }).filter(point => {return point != undefined})


    this.data.communicationIssue = this.communication.map((cycleResults) => {
      let filtered = cycleResults.filter((elem) => { return elem.id_resultado == 2 })
      if (filtered.length) {
        let amounts = filtered.map(item => item.amount)
        if (amounts){
          try{
        return { x: new Date(this.cycles[0][cycleResults[0].ciclo - 1].first), y: amounts.reduce((sum, item) => { return sum + item }) }}
        catch(e){
          
        }
      }
      }

    }).filter(point => {return point != undefined})



    this.data.possibleIssue = this.communication.map((cycleResults) => {
      let filtered = cycleResults.filter((elem) => { return elem.id_resultado == 3 })
      if (filtered.length) {
        let amounts = filtered.map(item => item.amount)
        if (amounts.length){
          try{
        return { x: new Date(this.cycles[0][cycleResults[0].ciclo - 1].first), y: amounts.reduce((sum, item) => { return sum + item }) }}
        catch(e){

        }
      }
      }


    }).filter(point => {return point != undefined})

    this.data.total = this.communication.map((cycleResults) => {
      let filtered = cycleResults.filter((elem) => { return elem.id_resultado == 7 || elem.id_resultado == 4 || elem.id_resultado == 2 || elem.id_resultado == 3 })
      if (filtered.length) {
        let amounts = filtered.map(item => item.amount)
        if (amounts.length){
          try{
        return { x: new Date(this.cycles[0][cycleResults[0].ciclo - 1].first), y: amounts.reduce((sum, item) => { return sum + item }) }}
        catch(e){
          
        }
      }
      }

    }).filter(point => {return point != undefined})

    console.log('total',this.data.total)


  }

  renderCommunicationOverviewChart() {
    this.chartCommunicationOverview = new CanvasJS.Chart(
      'chartCommunicationOverviewContainer',
      {
        animationEnabled: true,
        zoomEnabled: true,
        theme: "light2",
        title: {
          text: this.translate.instant('result.overview'),
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
            markerColor:"blue"
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
