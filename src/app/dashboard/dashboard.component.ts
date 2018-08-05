import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { SharedServiceService } from '../service/shared-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */ 
  constructor(
    private breakpointObserver: BreakpointObserver,
    private sharedServiceService:SharedServiceService
  ) {}

  ngOnInit(){
    this.subs()
  }

  subs(){
    this.sharedServiceService.getSubs().subscribe(
      (res) =>{
        console.log(res,'sub');
      },
      (err)=>{
        console.error(err);
      }
    )
  }

  unsubs(){
    this.sharedServiceService.unSubscribe().subscribe(
      (res) =>{
        console.log(res,'unsub');
      },
      (err)=>{
        console.error(err);
      }
    )
  }
}
