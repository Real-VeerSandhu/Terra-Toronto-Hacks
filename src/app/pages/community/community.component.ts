import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit, OnDestroy {

  mouseOn = false;
  low: number;
  mod: number;
  high: number;
  veryHigh: number;
  sub2: Subscription;


  constructor(private db: DbService) { }

  ngOnInit() {
    this.sub2 = this.db.getData('community').subscribe(c => {
      this.low = <any>c[1];
      this.mod = <any>c[2];
      this.high = <any>c[0];
      this.veryHigh = <any>c[3];
      console.log({c});
    });
  }
  ngOnDestroy(): void {
    this.sub2.unsubscribe();
  }

  hover() {
    this.mouseOn = true;

  }
  unhover() {
    this.mouseOn = false;
  }

}
