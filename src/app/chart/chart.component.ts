import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../service/shared-service.service';
import * as _ from 'underscore';
declare var Plotly:any
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  public finalArray= [];
  isLoadingResults:boolean;
  constructor(
    private sharedServiceService:SharedServiceService
  ) { }

  ngOnInit() {
    
    this.getHistoricalData();
    
  }

  getHistoricalData(){
    this.isLoadingResults = true;
    this.sharedServiceService.getHistory().subscribe(
      (res) =>{
        // console.log(res);
        
        res.forEach(element => {
          let splitElement = element.split(",");
          let data={};
          data['date']=splitElement[0];
          data['high']=splitElement[1];
          data['low']=splitElement[2];
          data['start']=splitElement[3];
          data['end']=splitElement[4];
          data['value']=splitElement[5];
          this.finalArray.push(data);
        });
        this.initChart(this.finalArray);
      },
      (err)=>{
        console.error(err);
      }
    )
  }

  initChart(finalArray){
    
    var trace2 = {
      x: _.pluck(finalArray,'date'), 
      close: _.pluck(finalArray,'end'), 
      decreasing: {line: {color: '#7F7F7F'}}, 
      high: _.pluck(finalArray,'high'), 
      increasing: {line: {color: '#17BECF'}}, 
      line: {color: 'rgba(31,119,180,1)'}, 
      low:  _.pluck(finalArray,'low'), 
      open:  _.pluck(finalArray,'start'), 
      type: 'ohlc', 
      xaxis: 'x', 
      yaxis: 'y'
    };
    
    var data = [trace2];
    var layout = {
      dragmode: 'zoom', 
      margin: {
        r: 10, 
        t: 25, 
        b: 40, 
        l: 60
      }, 
      showlegend: false, 
      xaxis: {
        autorange: true, 
        title: 'Date', 
        type: 'date'
      }, 
      yaxis: {
        autorange: true, 
        type: 'linear'
      }
    };
    this.isLoadingResults = false;
    Plotly.plot('plotly-div', data, layout);
  }

}
