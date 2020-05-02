import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule
  ],
  entryComponents: [ToolbarComponent],
  exports: [
    ToolbarComponent
  ]
})
export class ComponentModule {
  static forRoot() {
    return {
      NgModule: ComponentModule
    };
  }
}
