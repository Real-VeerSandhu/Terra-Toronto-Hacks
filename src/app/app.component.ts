import { Component } from '@angular/core';
import { GeolocationService } from './services/geolocation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private gloc: GeolocationService) {
    this.gloc.getLocation().then(r => {
      console.log(r);
    }).catch (error => {
      console.log(error);
    });
  }
}
