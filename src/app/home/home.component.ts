import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  mouseOn = false;

  constructor() { }

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
}
