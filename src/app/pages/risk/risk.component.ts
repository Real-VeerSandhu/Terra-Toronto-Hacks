import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { GeolocationService, IGeoLocation } from 'src/app/services/geolocation.service';
import { infectedLocations, randomPointGen, personalLocations, distance } from '../../data/location-data';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import { addDays } from 'date-fns';

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

  constructor(private ls: LocalStorageService, private gloc: GeolocationService) { }

  ngOnInit() {
  }

  hover() {
    console.log('HOVER');
    this.mouseOn = true;

  }
  unhover() {
    console.log('UNHOVER');
    this.mouseOn = false;
  }
  test() {
    this.gloc.getLocation().then(r => {
      console.log(r);
      const loc: IGeoLocation = {
        longitude: (<any>r).coords.longitude,
        latitude: (<any>r).coords.latitude,
        speed: (<any>r).coords.speed
      };
      this.ls.create(loc)
      .then( () => {
        this.ls.getData();
      });
    }).catch (error => {
      console.log(error);
    });
  }
  covidGen() {
    this.covidArray = [];
    const startWindow = new Date(2020, 3, 11);
    const endWindow = addDays(startWindow, 14);
    for (const point of infectedLocations.concat(personalLocations)) {
      for (let i = 0; i < 10; i++) {
        const result = randomPointGen(point, startWindow, endWindow);
        this.covidArray.push(result);
      }
    }
    console.log('Covid Array: ', this.covidArray);
  }
  allGen() {
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
  distanceFinder() {
    this.covidGen();
    this.allGen();
    // this.exposures = 0;
    for (const bothLocation of this.locationsArray) {
      for (const covidLocation of this.covidArray) {
        const distanceOfTwoPoints = distance(bothLocation.point, covidLocation.point);
        if (distanceOfTwoPoints < 10) {
          if (Math.abs(differenceInMinutes(bothLocation.time, covidLocation.time)) < 30) {
            this.exposures = this.exposures +  1;
            console.log('Time difference: ', Math.abs(differenceInMinutes(bothLocation.time, covidLocation.time)));
            console.log(distanceOfTwoPoints, 'meters');
          }
        }
      }
    }
    console.log('Exposures: ', this.exposures);
  }
}

