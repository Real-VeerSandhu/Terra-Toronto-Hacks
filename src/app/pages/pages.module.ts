import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiskComponent } from './risk/risk.component';
import { Routes, RouterModule } from '@angular/router';
import { ComponentModule } from '../components/component.module';
import { MatButtonModule } from '@angular/material/button';
import { AdminComponent } from './admin/admin.component';


const routes: Routes =  [
  { path: 'risk', component: RiskComponent },
  { path: 'admin', component: AdminComponent },

];


@NgModule({
  declarations: [RiskComponent, AdminComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentModule,
    MatButtonModule
  ]
})
export class PagesModule { }
