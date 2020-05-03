import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { GeolocationService, IGeoLocation } from 'src/app/services/geolocation.service';
import { infectedLocations, randomPointGen, personalLocations, distance } from '../../data/location-data';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import { addDays } from 'date-fns';
import { DbService } from 'src/app/services/db.service';
import { Subscription } from 'rxjs';
import {Storage} from '@ionic/storage';


@Component({
  selector: 'app-risk',
  templateUrl: './risk.component.html',
  styleUrls: ['./risk.component.css']
})
export class RiskComponent implements OnInit {

  risk: number;
  exposures = 0;

  locationsArray = [];
  covidArray = [];

  mouseOn = false;
  sub: Subscription;

  constructor(private ls: LocalStorageService, private gloc: GeolocationService, private db: DbService, private storage: Storage) { }

  ngOnInit() {
    this.sub = this.db.getData().subscribe(r => {
      console.log('data', r);
      console.log('db data', r);
      for (const key in r) {
        if (r.hasOwnProperty(key)) {
          const element = <any>r[key];
          for (const iterator of element) {
            iterator.time = new Date(iterator.time);
          }
          this.covidArray = this.covidArray.concat(element);
        }
      }
      // this.covidArray = <any>r;
    });
    this.storage.forEach(t => {
      console.log('t', t);
      this.locationsArray = t;
    });
  }

  hover() {
    console.log('HOVER');
    this.mouseOn = true;

  }
  unhover() {
    console.log('UNHOVER');
    this.mouseOn = false;
  }
  genData() {
    this.locationsArray = [];
    const startWindow = new Date(2020, 3, 13, 6);
    const endWindow = new Date(2020, 3, 21, 7);
    for (const point of personalLocations.concat(infectedLocations)) {
      for (let i = 0; i < 1; i++) {
        const result = randomPointGen(point, startWindow, endWindow);
        this.locationsArray.push(result);
      }
    }
    console.log('Locations Array: ', this.locationsArray);
  }
  getRisk() {
    this.genData();
    for (const bothLocation of this.locationsArray) {
      for (const covidLocation of <any>this.covidArray) {
        const distanceOfTwoPoints = distance(bothLocation.iPoint, covidLocation.iPoint);
        if (distanceOfTwoPoints < 10) {
          if (Math.abs(differenceInMinutes(bothLocation.time, covidLocation.time)) < 30) {
            this.exposures = this.exposures + 1;
            console.log('Time difference: ', Math.abs(differenceInMinutes(bothLocation.time, covidLocation.time)));
            console.log(distanceOfTwoPoints, 'meters');
          }
        }
      }
    }
    console.log('Exposures FROM getRisk(): ', this.exposures);
  }
}

