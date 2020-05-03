import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiskComponent } from './risk/risk.component';
import { Routes, RouterModule } from '@angular/router';
import { ComponentModule } from '../components/component.module';
import { MatButtonModule } from '@angular/material/button';
import { AdminComponent } from './admin/admin.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import { CommunityComponent } from './community/community.component';


const routes: Routes =  [
  { path: 'risk', component: RiskComponent },
  { path: 'community', component: CommunityComponent },
  { path: 'admin', component: AdminComponent },
];


@NgModule({
  declarations: [RiskComponent, AdminComponent, CommunityComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatCardModule
  ]
})
export class PagesModule { }
