import { Injectable } from '@angular/core';

export interface IGeoLocation {
  latitude: number;
  longitude: number;
  speed: number;
}

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  getLocation() {
    if (navigator.geolocation) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      // navigator.geolocation.getCurrentPosition((position) => {
      //   const latLocation = position.coords.latitude;
      //   const longLocation = position.coords.longitude;
      //   console.log({ latLocation }, { longLocation });
      // });
    } else {
      console.log('Browser not supported');
      return new Promise(
        resolve => resolve({})
      );
    }
  }
}

