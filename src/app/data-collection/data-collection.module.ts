import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectZoneComponent } from './select-zone/select-zone.component';
import { HttpClientModule } from '@angular/common/http';
import { MapViewComponent } from './map-view/map-view.component';
import { EditPlotComponent } from './edit-plot/edit-plot.component';
import { CameraComponent } from './camera/camera.component';
import { WebcamModule } from 'ngx-webcam';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { EditRoadComponent } from './edit-road/edit-road.component';
import { EditBuildingComponent } from './edit-building/edit-building.component';



@NgModule({
  declarations: [
    SelectZoneComponent,
    MapViewComponent,
    EditPlotComponent,
    CameraComponent,
    UploadImageComponent,
    EditRoadComponent,
    EditBuildingComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WebcamModule
  ]
})
export class DataCollectionModule { }
