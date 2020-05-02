import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiskComponent } from './risk/risk.component';
import { Routes, RouterModule } from '@angular/router';
import { ComponentModule } from '../components/component.module';
import { MatButtonModule } from '@angular/material/button';


const routes: Routes =  [
  { path: 'risk', component: RiskComponent },
];


@NgModule({
  declarations: [RiskComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentModule,
    MatButtonModule
  ]
})
export class PagesModule { }
