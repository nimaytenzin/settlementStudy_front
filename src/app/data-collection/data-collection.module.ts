import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectZoneComponent } from './select-zone/select-zone.component';
import { HttpClientModule } from '@angular/common/http';
import { MapViewComponent } from './map-view/map-view.component';



@NgModule({
  declarations: [
    SelectZoneComponent,
    MapViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule

  ]
})
export class DataCollectionModule { }
