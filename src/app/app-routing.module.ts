import { EditPlotComponent } from './data-collection/edit-plot/edit-plot.component';
import { MapViewComponent } from './data-collection/map-view/map-view.component';
import { SelectZoneComponent } from './data-collection/select-zone/select-zone.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: SelectZoneComponent},
  {path: 'map', component: MapViewComponent},
  {path: 'editPlot', component: EditPlotComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
