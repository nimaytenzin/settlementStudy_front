import { EditBuildingComponent } from './data-collection/edit-building/edit-building.component';
import { EditRoadComponent } from './data-collection/edit-road/edit-road.component';
import { UploadImageComponent } from './data-collection/upload-image/upload-image.component';
import { CameraComponent } from './data-collection/camera/camera.component';
import { EditPlotComponent } from './data-collection/edit-plot/edit-plot.component';
import { MapViewComponent } from './data-collection/map-view/map-view.component';
import { SelectZoneComponent } from './data-collection/select-zone/select-zone.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: SelectZoneComponent},
  {path: 'map', component: MapViewComponent},
  {path: 'editPlot', component: EditPlotComponent},
  {path:'camera',component:UploadImageComponent},
  {path:'editRoad',component:EditRoadComponent},
  {path:'editBuilding',component:EditBuildingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
