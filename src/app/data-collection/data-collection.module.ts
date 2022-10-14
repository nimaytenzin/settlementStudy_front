import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectZoneComponent } from './select-zone/select-zone.component';
import { HttpClientModule } from '@angular/common/http';
import { MapViewComponent } from './map-view/map-view.component';
import { EditPlotComponent } from './edit-plot/edit-plot.component';



@NgModule({
  declarations: [
    SelectZoneComponent,
    MapViewComponent,
    EditPlotComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DataCollectionModule { }
