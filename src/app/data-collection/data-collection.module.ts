import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectZoneComponent } from './select-zone/select-zone.component';
import { MapViewComponent } from './map-view/map-view.component';
import { EditPlotComponent } from './edit-plot/edit-plot.component';
import { CameraComponent } from './camera/camera.component';
import { EditBuildingComponent } from './edit-building/edit-building.component';
import { EditUnitComponent } from './edit-unit/edit-unit.component';
import { EditHouseholdComponent } from './edit-household/edit-household.component';

@NgModule({
  declarations: [
    SelectZoneComponent,
    MapViewComponent,
    EditPlotComponent,
    CameraComponent,
    EditBuildingComponent,
    EditUnitComponent,
    EditHouseholdComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class DataCollectionModule {}
