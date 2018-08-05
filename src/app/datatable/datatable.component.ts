import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { DatatableDataSource } from './datatable-datasource';
import { filter } from 'rxjs/operators';
import { SharedServiceService } from '../service/shared-service.service';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: DatatableDataSource;
  isLoadingResults:boolean;
  constructor(
    private sharedServiceService:SharedServiceService
  ){}
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 'low','high','start','end','volume'];
  finalArray=[];
  ngOnInit() {
    this.getHistoricalData();
    
  }

  getHistoricalData(){
    this.isLoadingResults = true;
    this.sharedServiceService.getHistory().subscribe(
      (res) =>{
        // console.log(res);
        this.isLoadingResults = false;
        res.forEach(element => {
          let splitElement = element.split(",");
          let data={};
          data['date']=splitElement[0];
          data['low']=splitElement[1];
          data['high']=splitElement[2];
          data['start']=splitElement[3];
          data['end']=splitElement[4];
          data['volume']=splitElement[5];
          this.finalArray.push(data);
        });
        this.dataSource = new DatatableDataSource(this.paginator, this.sort, this.finalArray);
      },
      (err)=>{
        console.error(err);
      }
    )
  }
}
