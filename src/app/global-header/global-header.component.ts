import { Component, HostListener, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-global-header',
  templateUrl: './global-header.component.html',
  styleUrls: ['./global-header.component.css']
})
export class GlobalHeaderComponent implements OnInit {

  userActivity: any;
  userInactive: Subject<any> = new Subject();

  constructor() {
    this.setTimeout();
    //this.userInactive.subscribe(() => prompt('user has been inactive for 3s'));
  }

  ngOnInit(): void {
    
  }

  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 3000);
  }

  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }

}
