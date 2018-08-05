import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-side-navgation',
  templateUrl: './side-navgation.component.html',
  styleUrls: ['./side-navgation.component.css']
})
export class SideNavgationComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(private breakpointObserver: BreakpointObserver) {}

  // fillerNav = Array.from({length: 10}, (_, i) => `Nav Item ${i + 1}`);
  fillerNav = [
    {
      path:'dashboard',
      title:'Home'
    },
    {
      path:'datatable',
      title:'Table'
    },
    {
      path:'chart',
      title:'Chart'
    },
    {
      path:'search',
      title:'Search'
    }

  ]
  
  }
